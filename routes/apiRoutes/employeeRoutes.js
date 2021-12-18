const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get All Employees
router.get('./employees', (req, res) => {
    const sql = `SELECT * FROM employee ORDER BY last_name`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
})

// Add A New Employee
router.post('/employee', ({body}, res) => {
    const errors = inputCheck(body, 'last_name', 'first_name', 'role_id', 'manager_id');
    if (errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = `INSERT INTO employee (last_name, first_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [body.last_name, body.first_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})

router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error:err.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            })
        }
    }) 
})

module.exports = router;