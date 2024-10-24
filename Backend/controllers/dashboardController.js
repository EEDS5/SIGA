const path = require('path');

exports.showDashboard = (req, res) => {
    if (req.session.user) {
        const userName = req.session.user.nombre_completo; // Obtener el nombre del usuario
        res.render('dashboard', { userName }); // Renderizar la vista dashboard.ejs
    } else {
        res.redirect('/auth/login');
    }
};

