console.log("Entro index.js");

let usuarios = JSON.parse(localStorage.getItem("usuarios") ) || [];
//input's
const inputNombre = document.getElementById("inputNombre");
const inputProfesion = document.getElementById("inputProfesion");
const inputEmail = document.getElementById("inputEmail");

//botones
const btnAgregar = document.getElementById("btnAgregar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const divUsuarios = document.getElementById("divUsuarios");
const alertSinUsuarios = document.getElementById("alertSinUsuarios");

let indexEditar = null;
class Usuario {
    constructor(nombre, profesion, email) {
        this.nombre = nombre;
        this.profesion = profesion;
        this.email = email;
    }
}

function guardarUsuario() {
    let nombre = inputNombre.value;
    let profesion = inputProfesion.value;
    let email = inputEmail.value;

    let usuario = new Usuario(
        nombre,
        profesion,
        email,
    );
    console.log(usuario);

    if (indexEditar === null) {
        console.log("Agregar usuario");
        usuarios.push(usuario);
        Swal.fire(
            'Usuario Guardado',
            '',
            'success',
          )
    } else {
        usuarios[indexEditar] = usuario;
        indexEditar = null;
        console.log("Editar usuario");

    }
    limpiarFormularioUsuarios();
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Entra funcion guardar usuario");
    mostrarUsuarios();
}

function clearAll() {
    console.log("Entro a borrar todo");
    localStorage.clear();
    usuarios = [];
    mostrarUsuarios();
    alert("Se borraron los usuarios")
}

function editarUsuario(index){
    console.log("Entro editar usuario:" + index);
    let usuarioAEditar = usuarios[index];
    console.log(usuarioAEditar, "usuarioAEditar");
    inputNombre.value = usuarioAEditar.nombre;
    inputProfesion.value = usuarioAEditar.profesion;
    inputEmail.value = usuarioAEditar.email;
    indexEditar = index;
    
}


function eliminarUsuario(index){
    console.log("Entro eliminar usuario:" + index);
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarUsuarios();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro de eliminar el usuario?',
        text: "El siguiente movimiento no se podrá revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancela!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed)  {
            
            swalWithBootstrapButtons.fire
            (
                'Eliminado',
                'El usuario ha sido eliminado.',
                'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
                
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'El usuario ha sido salvado :)',
                        'error'
                        )
                    }
                })
            }
            
            function mostrarUsuarios() {
                if (usuarios.length === 0) {
        divUsuarios.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertSinUsuarios" align="center">
            No hay usuarios agregados
        </div>`;
    } else {
        divUsuarios.innerHTML = "";
        usuarios.forEach((usuario, index) => {
            divUsuarios.innerHTML += `
            <div align="center">
                <div class="card mb-3" style="width: 50%">
                   <div class="row g-0">
                      <div class="d-grid gap-2 col-6 mx-auto">
                         <div class="card-body" >
                            <h5 class="card-title" align="center">${usuario.nombre}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary" align="center">${usuario.profesion} <br> ${usuario.email}</h6>
                            <div class="row mb-2">
                               <div class="d-grid gap-2 col-6 mx-auto">
                                  <button class="btn btn-warning w-10 mt-2" type="button" id="editar-${index}" onclick="editarUsuario(${index})">Editar</button>
                               </div>
                               <div class="d-grid gap-2 col-6 mx-auto">
                                  <button class="btn btn-danger w-10 mt-2" type="button" id="eliminar-${index}" onclick="eliminarUsuario(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}

function limpiarFormularioUsuarios(){
    inputNombre.value = "";
    inputProfesion.value = "";
    inputEmail.value = "";
}
btnAgregar.addEventListener("click", guardarUsuario);
btnBorrarTodo.addEventListener("click", clearAll);

mostrarUsuarios();