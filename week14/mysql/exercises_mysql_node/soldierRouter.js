import express from "express";
import { createTable } from "./dbConnection.js";
import { pool } from "./dbConnection.js";

const router = express.Router();

router.post("/soldiers", async (req, res) => {
    try {
        const { name, role, soldier_rank, unit, age, service_status, creation_data } = req.body;

        await pool.execute(
            "INSERT INTO soldiers (name, role, soldier_rank, unit, age, service_status) VALUES (?, ?, ?, ?, ?, ?)",
            [name, role, soldier_rank, unit, age, service_status]
        ); res.status(201).json({ message: "solider is added", soldier: req.body });
        console.table(req.body)
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

router.get("/soldiers", async (req, res) => {
    try {
        const { unit, rank, status } = req.query;
        let sql = "SELECT * FROM soldiers WHERE 1=1";
        if (unit) {
            sql += " AND unit = '" + unit + "'";
        }
        if (rank) {
            sql += " AND soldier_rank = '" + rank + "'";
        }
        if (status) {
            sql += " AND service_status = '" + status + "'";
        }
        const [rows] = await pool.execute(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error in GET /soldiers:", error.message);
        res.status(500).json({ error: error.message });
    };
});

router.get("/soldiers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT * FROM soldiers WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: `Soldier with ID ${id} not found` });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error in GET /soldiers/:id:", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.put("/soldiers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, soldier_rank, unit, age, service_status } = req.body;
        if (!name || !service_status) {
            return res.status(400).json({ error: "Name and service status are required for update." });
        }
        const query = `
            UPDATE soldiers 
            SET name = ?, role = ?, soldier_rank = ?, unit = ?, age = ?, service_status = ?
            WHERE id = ?
        `;
        const [result] = await pool.execute(query, [
            name,
            role || null,
            soldier_rank || null,
            unit || null,
            age || null,
            service_status,
            id
        ]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Soldier with ID ${id} not found` });
        }
        res.status(200).json({ message: `Soldier with ID ${id} updated successfully` });
    } catch (error) {
        console.error("Error in PUT /soldiers/:id:", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/soldiers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.execute("DELETE FROM soldiers WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Soldier with ID ${id} not found` });
        }
        res.status(200).json({ message: `Soldier with ID ${id} deleted successfully` });

    } catch (error) {
        console.error("Error in DELETE /soldiers/:id:", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.patch("/soldiers/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const service_status = req.body.service_status || req.body.status;
        if (!service_status) {
            return res.status(400).json({ error: "service_status is required in body." });
        }

        if (service_status !== "active" && service_status !== "inactive") {
            return res.status(400).json({ error: "service_status must be 'active' or 'inactive'." });
        }
        const [result] = await pool.execute(
            "UPDATE soldiers SET service_status = ? WHERE id = ?",
            [service_status, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Soldier with ID ${id} not found` });
        }
        const [rows] = await pool.execute("SELECT * FROM soldiers WHERE id = ?", [id]);
        res.status(200).json({
            message: "Soldier status updated successfully",
            soldier: rows[0]
        });
    } catch (error) {
        console.error("Error in PATCH /soldiers/:id/status:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
