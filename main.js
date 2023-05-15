const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const form = document.querySelector("#form");
const elementosControl = document.querySelector("#body");
const principal = document.querySelector(".principal");
const alert = document.querySelector(".alert");


let editarAccion = false;
alert.style.display = "none"




const objetoControl = {
    id: '',
    nombre: '',
    apellido: ''
}

const datosCita = (e) => {
    objetoControl[e.target.name] = e.target.value
}

const sendForm = (e) => {
    e.preventDefault()


    if(inputNombre.value === "" || inputApellido.value === "") {

        alert.style.display = "block"

        setTimeout(() => {
            alert.style.display = "none"
        }, 1000);

        return

       
    }




  

    if(!editarAccion) {

        objetoControl.id = Date.now()
        acciones.agregarElemento({...objetoControl})


       


    }else {
        acciones.editarElemento({...objetoControl})

        editarAccion = false
    }
    

    principal.innerHTML = "Agregar"

    objetoControl.id = "";
    objetoControl.nombre = "";
    objetoControl.apellido = "";

    form.reset()

    ui.mostrarElementos(acciones)


}



inputNombre.addEventListener('input', datosCita)
inputApellido.addEventListener('input', datosCita)
form.addEventListener('submit', sendForm)




class Acciones {

    constructor() {
        this.elementos = []
    }

    agregarElemento(elemento) {
        this.elementos = [...this.elementos, elemento]
    }

    eliminarElemento(id) {
        this.elementos = this.elementos.filter(elemento => elemento.id !== id)
    }

    editarElemento(elementoEnviado) {
        this.elementos = this.elementos.map(elemento => elemento.id === elementoEnviado.id ? elementoEnviado : elemento)
    }


}

class UI {

    constructor() {
        this.error = ""
    }

    mostrarElementos({elementos}) {
        elementosControl.innerHTML = ""

        elementos.forEach(element => {
            const tr = document.createElement('tr');
            const thId= document.createElement('th');
            const tdNombre= document.createElement('td');
            const tdApellido = document.createElement('td');
            const tdBotones= document.createElement('td');
            const buttonEditar = document.createElement('button');
            const buttonEliminar = document.createElement('button');

            buttonEditar.classList.add('btn', 'btn-warning', "me-1")
            buttonEliminar.classList.add('btn', 'btn-danger')

            buttonEditar.innerText = "Editar"
            buttonEliminar.innerText = "Eliminar"
            tdNombre.innerHTML = element.nombre
            tdApellido.innerHTML = element.apellido
            thId.innerHTML = element.id

            buttonEliminar.onclick=() => eliminar(element.id)
            buttonEditar.onclick=() => editar(element)


            tr.appendChild(thId);
            tr.appendChild(tdNombre);
            tr.appendChild(tdApellido);
            tr.appendChild(tdBotones);
            tdBotones.appendChild(buttonEditar)
            tdBotones.appendChild(buttonEliminar)


            elementosControl.appendChild(tr)
        });


    }

}


const acciones = new Acciones()
const ui = new UI()



const eliminar = (id) => {
    acciones.eliminarElemento(id)

    ui.mostrarElementos(acciones)
}

const editar = (elemento) => {

    objetoControl.id = elemento.id
    objetoControl.nombre = elemento.nombre
    objetoControl.apellido = elemento.apellido

    inputNombre.value = elemento.nombre
    inputApellido.value = elemento.apellido

    editarAccion = true

    principal.innerHTML = "Editar"

}




