console.log('conectado');

const socketCliente = io();

//variables de productos
const nombre = document.getElementById('nombre')
const precio = document.getElementById('precio')
const url = document.getElementById('url')

const enviar = document.getElementById('enviar')
const detalleProducto = document.getElementById('detalleProducto')

// Envia datos de productos
if(enviar){
    enviar.addEventListener('click',()=>{
        socketCliente.emit('nuevoProducto',{
            producto: nombre.value,
            precio: precio.value,
            url:url.value

        })
        
    })

    //recibe los productos
    socketCliente.on('lista', (data) =>{
        let prod=''
        data.forEach(e => {
            prod += `<tr>
            <td>${e.producto}</td>
            <td>${e.precio}</td>
            <td><img src="${e.url}" alt="${e.producto}"> </td>
            </tr>`
        });
        detalleProducto.innerHTML = prod
    })

}


// variables del chat
const msj = document.getElementById('msj')
const chatHistorico = document.getElementById('chatHistorico')
const enviarMsj = document.getElementById('enviarMsj')
let user 


Swal.fire({
    title: 'Bienvenido/a',
    text:'Ingrese su Email',
    input:'email',
    allowOutsideClick: false,
}).then(res=>{
    user=res.value
})


if(msj){
    enviarMsj.addEventListener('click',e=>{
        socketCliente.emit('nuevoMsj',{
            userEmail: user,
            message: msj.value,
            hora: new Date()
        })
        msj.value=''
    })
    
    //recibe los msj
    socketCliente.on('chat',(data)=>{
        let elemento = ''
        data.forEach(e => {
            elemento += `<p class='text-success'><strong class='text-primary'>${e.userEmail}</strong> <strong class='text-danger'>${e.hora}</strong>: ${e.message}</p>`
        });
        chatHistorico.innerHTML = elemento
    })
}
