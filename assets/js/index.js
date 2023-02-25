
document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById("saveBtn");
    const inputUser = document.getElementById("inputUser")
    const inputTask = document.getElementById("inputTask");
    const inputArea = document.getElementById("inputArea");
    const inputComents = document.getElementById("inputComents");
    const inputDate = document.getElementById("inputDate");
    const tableBody = document.getElementById("tableBody");

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
                <td>Tareas de ${item.user}</td>
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.task}</td>
                    <td>${item.area}</td>
                    <td>${item.coments}</td>
                    <td>${item.date}</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-warning btn-edit" data-index="${index}">Editar</button>
                        <button type="button" class="btn btn-danger btn-delete" data-index="${index}">Eliminar</button>
                    </td>
                </tr>
            `;

            tableBody.appendChild(tr);
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
        }
    });

    loadData();
});

