const express = require('express');
const cors = require('cors');
const app = express();
const myslq = require('mysql2');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

const db = myslq.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "todo",
})

// mysql://root:QkJdcZbdVEVpPrkAiKjJlEUTwtUWRwZQ@shinkansen.proxy.rlwy.net:57484/railway
db.connect(error => {
    if (!error) {
        console.log('Connected to database')
    }
    else {
        console.log('Failed to connect')
    }
})

app.post('/add-todo', (req, res) => {
    const query = 'insert into todo (description,createdAt,importance) values (?,?,?)'
    db.query(query, [req.body.todo.description, req.body.todo.createdAt, req.body.todo.importance], (error, result) => {
        if (error) console.log(error);
        else {
            const newToDo = 'select * from todo'
            db.query(newToDo, (error, newList) => {
                res.send(newList);
            });
        }
    })
})

app.post('/new-user', async (req, res) => {
    const query = 'insert into user (username,password) values (?,?)'
    const cpassword = await bcrypt.hash(req.body.user.password);

    db.query(query, [req.body.user.username, cpassword], (error, result) => {
        if (error) console.log(error);
        else {
            const newuser = 'select * from user'
            db.query(newuser, (error, newList) => {
                res.send(newList);
            });
        }
    })
})

app.get('/get-todo', (req, res) => {
    const query = 'select * from todo';
    db.query(query, (error, result) => {
        if (error) console.log(error)
        else {
            res.send(result);
        }
    })
})

app.put('/update-todo/:id', (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const query = 'UPDATE todo SET description = ? WHERE id = ?';

    db.query(query, [description, id], (error, result) => {
        if (error) {
            console.error('Error updating todo:', error);
            return res.status(500).json({ message: 'Error updating todo' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo updated successfully' });
    });
});

app.put('/setCompleted/:id', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE todo SET completed = 1 WHERE id = ?';

    db.query(query, [id], (error, result) => {
        if (error) {
            console.error('Error updating todo:', error);
            return res.status(500).json({ message: 'Error updating todo' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo updated successfully' });
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const q = 'DELETE FROM todo WHERE id = ?';
    db.query(q, [id], (err, result) => {
        if (err) {
            console.error('Error deleting todo:', err);
            return res.status(500).json({ message: 'Failed to delete todo' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    });
});

const port = process.env.port || 3000;
app.listen(port, () => { console.log(`Listening at port ${port}`) });