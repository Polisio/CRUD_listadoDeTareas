
document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById("saveBtn");
    const inputUser = document.getElementById("inputUser")
    const inputTask = document.getElementById("inputTask");
    const inputArea = document.getElementById("inputArea");
    const inputComents = document.getElementById("inputComents");
    const inputDate = document.getElementById("inputDate");
    const tableBody = document.getElementById("tableBody");
    const tableResponsive =document.getElementById("tableResponsive")

    function loadData() {
        tableBody.innerHTML = `
            <tr id="noData">
                <td colspan="12" class="text-center">Por el momento no hay datos almacendos</td>
            </tr>
        `;
        const data = JSON.parse(localStorage.getItem("data")) || [];
        if (data.length) {
            document.getElementById("noData").remove();
        }
        data.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                    <td>${item.user}</td>
                    <td>${index + 1}</td>
                    <td>${item.task}</td>
                    <td>${item.area}</td>
                    <td>${item.coments}</td>
                    <td>${item.date}</td>
                    <td class="text-center">
                        <button type="button" class="buttonCrear btn-edit" data-index="${index}">Editar</button>
                        <button type="button" class="buttonCrear btn-delete" data-index="${index}">Eliminar</button>
                    </td>
            `;

            tableBody.appendChild(tr);
        });
    }

    function loadDataResp() {
        tableResponsive.innerHTML = `
        <div class="item">
            <div class="row">
                <table  class="table table-bordered">
                    <tr id="noData">
                        <td colspan="12" class="text-center">Por el momento no hay datos almacenados</td>
                    </tr>
                </table>
            </div>
        </div>
        `;

        const data = JSON.parse(localStorage.getItem("data")) || [];
        if (data.length) {
            document.getElementById("noData").remove();
        }
        data.forEach((item, index) => {

            const div = document.createElement("div");
            div.innerHTML = `
            <div class="item">
                <div class="row">
                    <table class="table table-bordered">
                        <thead>
                            <td class="thead col-4">Usuario</td>
                            <td class="item col-8" id="user">${item.user}</td>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="item">
                <div class="row">
                    <table  class="table table-bordered">
                        <thead>
                            <td class="thead col-4">ID</td>
                            <td class="item col-8" id="identificador">${index + 1}</td>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="item">
                <div class="row">
                    <table  class="table table-bordered">
                        <thead>
                            <td class="thead col-4">Tarea</td>
                            <td class="item col-8" id="task">${item.task}</td>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="item">
                <div class="row">
                    <table  class="table table-bordered">
                        <thead>
                            <td class="thead col-4">Materia</td>
                            <td class="item col-8" id="area">${item.area}</td>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="item">
                <div class="row">
                    <table  class="table table-bordered">
                        <thead>
                            <td class="thead col-4">Comentarios</td>
                            <td class="item col-8" id="coments">${item.coments}</td>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="item">
                <div class="row">
                    <table  class="table table-bordered">
                        <thead>
                            <td class="thead col-4">Fecha de entrega</td>
                            <td class="item col-8" id="date">${item.date}</td>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="item">
                <div class="row">
                    <table  class="table table-bordered">
                        <thead>
                            <td class="thead col-4">Acciones</td>
                            <td class="item col-8 text-center" id="actions">
                                <button type="button" class="buttonCrear btn-edit" data-index="${index}">Editar</button>
                                <button type="button" class="buttonCrear btn-delete" data-index="${index}">Eliminar</button>
                            </td>
                        </thead>
                    </table>
                </div>
            </div>
            `

            tableResponsive.appendChild(div);
        });
    }

    function clearForm() {
        inputUser.value = "";
        inputTask.value = "";
        inputArea.value = "";
        inputComents.value = "";
        inputDate.value = "";
    }


    saveBtn.addEventListener("click", function () {
        const user = inputUser.value;
        const task = inputTask.value;
        const area = inputArea.value;
        const coments = inputComents.value;
        const date = inputDate.value;
        if (!user) {
            return;
        }
        const data = JSON.parse(localStorage.getItem("data")) || [];
        const index = saveBtn.getAttribute("data-index");
        console.log(index, "index");
        if (index) {
            data[index] = { user, task, area, coments, date };
            saveBtn.removeAttribute("data-index");
            saveBtn.textContent = "Guardar";
        } else {
            data.push({ user, task, area, coments, date });
        }
        localStorage.setItem("data", JSON.stringify(data));
        loadData();
        loadDataResp();
        clearForm();
    });

    tableBody.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-edit")) {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            const item = data[index];

            inputUser.value = item.user
            inputTask.value = item.task;
            inputArea.value = item.area;
            inputComents.value = item.coments;
            inputDate.value = item.date

            saveBtn.textContent = "Actualizar";
            saveBtn.setAttribute("data-index", index);
        } else if (e.target.classList.contains("btn-delete")) {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            data.splice(index, 1);
            localStorage.setItem("data", JSON.stringify(data));
            loadData();
            loadDataResp();
        }
    });

    tableResponsive.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-edit")) {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            const item = data[index];

            inputUser.value = item.user
            inputTask.value = item.task;
            inputArea.value = item.area;
            inputComents.value = item.coments;
            inputDate.value = item.date

            saveBtn.textContent = "Actualizar";
            saveBtn.setAttribute("data-index", index);
        } else if (e.target.classList.contains("btn-delete")) {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            data.splice(index, 1);
            localStorage.setItem("data", JSON.stringify(data));
            loadDataResp();
            loadData();
        }
    });

    loadData();
    loadDataResp();
});

