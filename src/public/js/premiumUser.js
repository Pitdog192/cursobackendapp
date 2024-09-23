document.getElementById('premiumForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario
    const uid = document.getElementById('uidInput').value; // Obtener el valor del input
    
    // Asegúrate de enviar el uid como parte de la URL, ya que tu servidor espera un parámetro en la ruta
    fetch(`/api/users/premium/${uid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .then(data => {
        console.log('Solicitud exitosa:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});