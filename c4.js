const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware para analizar JSON
app.use(express.json());

// Ruta para obtener la imagen camuflada
app.get('/consulta', async (req, res) => {
    try {
        // Obtiene el DNI de la solicitud
        const dni = req.query.dni;
        
        // Si no se proporciona un DNI, devuelve un error
        if (!dni) {
            return res.status(400).json({ error: 'Se requiere el número de DNI.' });
        }
        
        // URL de la API original con el DNI proporcionado
        const apiUrl = `https://api.ddosis.fun/c4azul?token=NLpJuQkLCEZUdKlUCgyJPlhOAij&dni=${dni}`;
        
        // Realiza una solicitud a la API original
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        // Devuelve la imagen camuflada en la respuesta
        res.set('Content-Type', 'image/jpeg');
        res.send(response.data);
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener la imagen:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
