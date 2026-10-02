
import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();

// ==================================================
// SERVER
// ==================================================

const PORT = Number(process.env.PORT) || 3000;

// ==================================================
// DATABASE
// ==================================================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test database connection
pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==================================================
// IMAGE UPLOAD
// ==================================================

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);

    const filename = `profile-${Date.now()}${extension}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, PNG, WEBP and GIF images are allowed"
        )
      );
    }
  },
});

// Serve uploaded images
app.use(
  "/uploads",
  express.static(uploadDir)
);

// ==================================================
// TEST ROUTE
// ==================================================

app.get("/", (_req, res) => {
  res.json({
    message: "Portfolio backend is running",
  });
});

// ==================================================
// PROJECTS
// ==================================================

app.get("/api/projects", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const {
      title,
      description,
      tech,
      github,
      live,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message:
          "Title and description are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO projects
        (title, description, tech, github, live)
       VALUES
        ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        title,
        description,
        tech || "",
        github || "",
        live || "",
      ]
    );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save project",
    });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      tech,
      github,
      live,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message:
          "Title and description are required",
      });
    }

    const result = await pool.query(
      `UPDATE projects
       SET
         title = $1,
         description = $2,
         tech = $3,
         github = $4,
         live = $5,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [
        title,
        description,
        tech || "",
        github || "",
        live || "",
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM projects
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message:
        "Project deleted successfully",
      project: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
});

// ==================================================
// PROFILE
// ==================================================

app.get("/api/profile", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM profile
       ORDER BY id DESC
       LIMIT 1`
    );

    if (result.rows.length === 0) {
      return res.json(null);
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
});

app.post(
  "/api/profile",
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        name,
        job_title,
        bio,
        email,
        location,
        github,
        linkedin,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          message: "Name is required",
        });
      }

      const existingProfile =
        await pool.query(
          "SELECT id FROM profile LIMIT 1"
        );

      if (
        existingProfile.rows.length > 0
      ) {
        return res.status(409).json({
          message:
            "Profile already exists",
        });
      }

      const image = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const result = await pool.query(
        `INSERT INTO profile
        (
          name,
          job_title,
          bio,
          email,
          location,
          github,
          linkedin,
          image
        )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [
          name,
          job_title || "",
          bio || "",
          email || "",
          location || "",
          github || "",
          linkedin || "",
          image,
        ]
      );

      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      if (req.file) {
        const uploadedPath =
          path.join(
            uploadDir,
            req.file.filename
          );

        if (
          fs.existsSync(uploadedPath)
        ) {
          fs.unlinkSync(uploadedPath);
        }
      }

      res.status(500).json({
        message:
          "Failed to create profile",
      });
    }
  }
);

app.put(
  "/api/profile/:id",
  upload.single("image"),
  async (req, res) => {
    let newImagePath: string | null =
      null;

    try {
      const { id } = req.params;

      const {
        name,
        job_title,
        bio,
        email,
        location,
        github,
        linkedin,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          message: "Name is required",
        });
      }

      // Find existing profile
      const currentProfile =
        await pool.query(
          "SELECT * FROM profile WHERE id = $1",
          [id]
        );

      if (
        currentProfile.rows.length === 0
      ) {
        if (req.file) {
          const uploadedPath =
            path.join(
              uploadDir,
              req.file.filename
            );

          if (
            fs.existsSync(uploadedPath)
          ) {
            fs.unlinkSync(
              uploadedPath
            );
          }
        }

        return res.status(404).json({
          message: "Profile not found",
        });
      }

      const oldImage =
        currentProfile.rows[0].image;

      // Keep existing image
      let image = oldImage;

      // If a new image was uploaded
      if (req.file) {
        image =
          `/uploads/${req.file.filename}`;

        newImagePath = path.join(
          uploadDir,
          req.file.filename
        );
      }

      // Update database
      const result = await pool.query(
        `UPDATE profile
         SET
           name = $1,
           job_title = $2,
           bio = $3,
           email = $4,
           location = $5,
           github = $6,
           linkedin = $7,
           image = $8,
           updated_at = CURRENT_TIMESTAMP
         WHERE id = $9
         RETURNING *`,
        [
          name,
          job_title || "",
          bio || "",
          email || "",
          location || "",
          github || "",
          linkedin || "",
          image,
          id,
        ]
      );

      // Delete old image only
      // after database update succeeds
      if (
        req.file &&
        oldImage
      ) {
        const oldImagePath =
          path.join(
            process.cwd(),
            oldImage
          );

        if (
          fs.existsSync(oldImagePath) &&
          oldImagePath !== newImagePath
        ) {
          fs.unlinkSync(
            oldImagePath
          );
        }
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error(
        "PROFILE UPDATE ERROR:",
        error
      );

      // Delete newly uploaded image
      // if database update failed
      if (
        newImagePath &&
        fs.existsSync(newImagePath)
      ) {
        fs.unlinkSync(
          newImagePath
        );
      }

      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "Failed to update profile",
      });
    }
  }
);

app.delete(
  "/api/profile/:id/image",
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        "SELECT image FROM profile WHERE id = $1",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Profile not found",
        });
      }

      const image =
        result.rows[0].image;

      if (image) {
        const imagePath =
          path.join(
            process.cwd(),
            image
          );

        if (
          fs.existsSync(imagePath)
        ) {
          fs.unlinkSync(
            imagePath
          );
        }
      }

      const updated =
        await pool.query(
          `UPDATE profile
           SET
             image = NULL,
             updated_at = CURRENT_TIMESTAMP
           WHERE id = $1
           RETURNING *`,
          [id]
        );

      res.json(
        updated.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to delete profile image",
      });
    }
  }
);

// ==================================================
// SKILLS
// ==================================================

app.get("/api/skills", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM skills ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch skills",
    });
  }
});

app.post("/api/skills", async (req, res) => {
  try {
    const {
      name,
      category,
      level,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message:
          "Skill name is required",
      });
    }

    const result = await pool.query(
      `INSERT INTO skills
        (name, category, level)
       VALUES
        ($1, $2, $3)
       RETURNING *`,
      [
        name,
        category || "",
        level || "",
      ]
    );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create skill",
    });
  }
});

app.put("/api/skills/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      level,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message:
          "Skill name is required",
      });
    }

    const result = await pool.query(
      `UPDATE skills
       SET
         name = $1,
         category = $2,
         level = $3,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [
        name,
        category || "",
        level || "",
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update skill",
    });
  }
});

app.delete(
  "/api/skills/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM skills
         WHERE id = $1
         RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Skill not found",
        });
      }

      res.json({
        message:
          "Skill deleted successfully",
        skill: result.rows[0],
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to delete skill",
      });
    }
  }
);

// ==================================================
// EDUCATION
// ==================================================

app.get(
  "/api/education",
  async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM education ORDER BY id DESC"
      );

      res.json(result.rows);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch education",
      });
    }
  }
);

app.post(
  "/api/education",
  async (req, res) => {
    try {
      const {
        degree,
        institution,
        start_year,
        end_year,
        description,
      } = req.body;

      if (!degree || !institution) {
        return res.status(400).json({
          message:
            "Degree and institution are required",
        });
      }

      const result = await pool.query(
        `INSERT INTO education
        (
          degree,
          institution,
          start_year,
          end_year,
          description
        )
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
          degree,
          institution,
          start_year || null,
          end_year || null,
          description || "",
        ]
      );

      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to create education",
      });
    }
  }
);

app.put(
  "/api/education/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        degree,
        institution,
        start_year,
        end_year,
        description,
      } = req.body;

      if (!degree || !institution) {
        return res.status(400).json({
          message:
            "Degree and institution are required",
        });
      }

      const result = await pool.query(
        `UPDATE education
         SET
           degree = $1,
           institution = $2,
           start_year = $3,
           end_year = $4,
           description = $5,
           updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING *`,
        [
          degree,
          institution,
          start_year || null,
          end_year || null,
          description || "",
          id,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Education not found",
        });
      }

      res.json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to update education",
      });
    }
  }
);

app.delete(
  "/api/education/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM education
         WHERE id = $1
         RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Education not found",
        });
      }

      res.json({
        message:
          "Education deleted successfully",
        education:
          result.rows[0],
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to delete education",
      });
    }
  }
);

// ==================================================
// EXPERIENCE
// ==================================================

app.get(
  "/api/experience",
  async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM experience ORDER BY id DESC"
      );

      res.json(result.rows);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch experience",
      });
    }
  }
);

app.post(
  "/api/experience",
  async (req, res) => {
    try {
      const {
        job_title,
        company,
        start_date,
        end_date,
        description,
      } = req.body;

      if (!job_title || !company) {
        return res.status(400).json({
          message:
            "Job title and company are required",
        });
      }

      const result = await pool.query(
        `INSERT INTO experience
        (
          job_title,
          company,
          start_date,
          end_date,
          description
        )
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
          job_title,
          company,
          start_date || null,
          end_date || null,
          description || "",
        ]
      );

      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to create experience",
      });
    }
  }
);

app.put(
  "/api/experience/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        job_title,
        company,
        start_date,
        end_date,
        description,
      } = req.body;

      if (!job_title || !company) {
        return res.status(400).json({
          message:
            "Job title and company are required",
        });
      }

      const result = await pool.query(
        `UPDATE experience
         SET
           job_title = $1,
           company = $2,
           start_date = $3,
           end_date = $4,
           description = $5,
           updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING *`,
        [
          job_title,
          company,
          start_date || null,
          end_date || null,
          description || "",
          id,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Experience not found",
        });
      }

      res.json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to update experience",
      });
    }
  }
);

app.delete(
  "/api/experience/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM experience
         WHERE id = $1
         RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Experience not found",
        });
      }

      res.json({
        message:
          "Experience deleted successfully",
        experience:
          result.rows[0],
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to delete experience",
      });
    }
  }
);

// ==================================================
// INTERESTS
// ==================================================

app.get(
  "/api/interests",
  async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM interests ORDER BY id DESC"
      );

      res.json(result.rows);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch interests",
      });
    }
  }
);

app.post(
  "/api/interests",
  async (req, res) => {
    try {
      const {
        name,
        description,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          message:
            "Interest name is required",
        });
      }

      const result = await pool.query(
        `INSERT INTO interests
          (name, description)
         VALUES
          ($1, $2)
         RETURNING *`,
        [
          name,
          description || "",
        ]
      );

      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to create interest",
      });
    }
  }
);

app.put(
  "/api/interests/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        name,
        description,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          message:
            "Interest name is required",
        });
      }

      const result = await pool.query(
        `UPDATE interests
         SET
           name = $1,
           description = $2,
           updated_at = CURRENT_TIMESTAMP
         WHERE id = $3
         RETURNING *`,
        [
          name,
          description || "",
          id,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Interest not found",
        });
      }

      res.json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to update interest",
      });
    }
  }
);

app.delete(
  "/api/interests/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM interests
         WHERE id = $1
         RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Interest not found",
        });
      }

      res.json({
        message:
          "Interest deleted successfully",
        interest:
          result.rows[0],
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to delete interest",
      });
    }
  }
);

// ==================================================
// MESSAGES
// ==================================================

app.get(
  "/api/messages",
  async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM messages ORDER BY id DESC"
      );

      res.json(result.rows);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch messages",
      });
    }
  }
);

app.post(
  "/api/messages",
  async (req, res) => {
    try {
      const {
        name,
        email,
        subject,
        message,
      } = req.body;

      if (
        !name ||
        !email ||
        !message
      ) {
        return res.status(400).json({
          message:
            "Name, email and message are required",
        });
      }

      const result = await pool.query(
        `INSERT INTO messages
        (
          name,
          email,
          subject,
          message
        )
        VALUES
        ($1, $2, $3, $4)
        RETURNING *`,
        [
          name,
          email,
          subject || "",
          message,
        ]
      );

      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to create message",
      });
    }
  }
);

app.put(
  "/api/messages/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        is_read,
      } = req.body;

      const result = await pool.query(
        `UPDATE messages
         SET
           is_read = $1
         WHERE id = $2
         RETURNING *`,
        [
          is_read,
          id,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Message not found",
        });
      }

      res.json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to update message",
      });
    }
  }
);

app.delete(
  "/api/messages/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM messages
         WHERE id = $1
         RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Message not found",
        });
      }

      res.json({
        message:
          "Message deleted successfully",
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to delete message",
      });
    }
  }
);

// ==================================================
// ERROR HANDLER
// ==================================================

app.use(
  (
    error: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(error);

    if (
      error instanceof
      multer.MulterError
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (
      error?.message ===
      "Only JPG, PNG, WEBP and GIF images are allowed"
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message:
        "Something went wrong",
    });
  }
);

// ==================================================
// START SERVER
// ==================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Backend running on port ${PORT}`
    );
  }
);
