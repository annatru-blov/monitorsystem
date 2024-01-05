const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs').promises;

app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


async function generateRandomNames() {
  try {
    const filePath = 'randomNames.txt';
    const data = await fs.readFile(filePath, 'utf-8');
    const namesArray = data.split('\n').filter(name => name.trim() !== '');
    const numberOfNames = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    const randomNames = [];

    for (let i = 0; i < numberOfNames; i++) {
      const randomIndex = Math.floor(Math.random() * namesArray.length);
      randomNames.push(namesArray[randomIndex]);
    }

    return randomNames;
  } catch (error) {
    console.error('Error reading names file:', error);
    throw error;
  }
}

async function getAISByUserId(user_id) {
  try {
    const result = await pool.query('SELECT * FROM AIS WHERE user_id = $1', [user_id]);
    return result.rows;
  } catch (error) {
    console.error('Ошибка при извлечении данных из таблицы AIS:', error);
    throw error;
  }
}

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userResult = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );

    const newUser = userResult.rows[0];
    const user_id = newUser.id;
    const generatedNames = await generateRandomNames();

    const insertPromises = generatedNames.map(async (generatedName) => {
      await pool.query(`
        INSERT INTO AIS (name, book, server, bookmark, user_id)
        VALUES ($1, $2, $3, $4, $5)
      `, [generatedName, (Math.floor(Math.random() * 100) + 1), (Math.floor(Math.random() * 100) + 1), (Math.floor(Math.random() * 100) + 1), user_id]);
    });

    await Promise.all(insertPromises);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/updateProfile', async (req, res) => {
  const { user_id, firstName, surname, middleName, identificationNumber, login, email, mobileNumber } = req.body;

  try {
    const updateFields = [];
    const updateValues = [];

    if (firstName !== null) {
      updateFields.push('first_name');
      updateValues.push(firstName);
    }

    if (surname !== null) {
      updateFields.push('last_name');
      updateValues.push(surname);
    }

    if (middleName !== null) {
      updateFields.push('middle_name');
      updateValues.push(middleName);
    }

    if (identificationNumber !== null) {
      updateFields.push('identification_number');
      updateValues.push(identificationNumber);
    }

    if (login !== null) {
      updateFields.push('username');
      updateValues.push(login);
    }

    if (email !== null) {
      updateFields.push('email');
      updateValues.push(email);
    }

    if (mobileNumber !== null) {
      updateFields.push('phone_number');
      updateValues.push(mobileNumber);
    }

  
    if (updateFields.length > 0) {
      const updateQuery = `
        UPDATE users
        SET ${updateFields.map((field, index) => `${field} = $${index + 1}`).join(',')}
        WHERE id = $${updateFields.length + 1}
      `;

      const updateParams = [...updateValues, user_id];

      await pool.query(updateQuery, updateParams);

      res.status(200).json({ message: 'Данные профиля успешно обновлены' });
    } else {
     
      res.status(400).json({ error: 'Не переданы новые значения для обновления' });
    }
  } catch (error) {
    console.error('Ошибка при обновлении данных профиля:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.post('/getDataByUserId', async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const data = await getAISByUserId(user_id);

    res.status(200).json({ data });
  } catch (error) {
    console.error('Ошибка при получении данных по user_id:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 1) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.status(200).json({
          user: {
            id: user.id,
            login: user.username,
            password: user.password,
            first_name: user.first_name,
            last_name : user.last_name,
            middle_name: user.middle_name,
            identification_number: user.identification_number, 
            email: user.email, 
            phone_number: user.phone_number,   
          }
        });
      } else {
        res.status(401).json({ message: 'Login failed. Incorrect password.' });
      }
    } else {
      res.status(401).json({ message: 'Login failed. User not found.' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
