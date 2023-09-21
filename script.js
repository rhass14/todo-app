const prepDescription = document.getElementById("description");
const btnAdd = document.getElementById("btn-add");
const prepList = document.getElementById("prep-list");
const btnRem = document.getElementById("btn-remove");

const state = {
  prepTasks: [
    { description: "check passport validity", done: false, id: 1 },
    { description: "pack camera", done: true, id: 2 },
  ],
};

btnAdd.addEventListener("click", addPrepTask);

prepList.addEventListener("change", updateTask);
btnRem.addEventListener("click", removeDoneTodos);

function restoreTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("prepTasks"));
  console.log("storedTasks", storedTasks);
  if (storedTasks) {
    state.prepTasks = storedTasks;
  }
}
function addPrepTask(event) {
  event.preventDefault();

  const newPrepTask = {
    description: prepDescription.value,
    done: false,
    id: Math.floor(Math.random() * 5000000),
  };

  state.prepTasks.push(newPrepTask);

  localStorage.setItem("prepTasks", JSON.stringify(state.prepTasks));

  restoreTasks();
  renderPrepTasks();
}
const prepFilter = document.querySelectorAll("#prep-filter-list input");
prepFilter.forEach((prepFilter) => {
  prepFilter.addEventListener("change", () => {
    renderPrepTasks();
  });
});

function getSelectedFilter() {
  let selectedFilter = null;

  prepFilter.forEach((input) => {
    if (input.checked) {
      selectedFilter = input.value;
    }
  });

  return selectedFilter;
}

function renderPrepTasks() {
  prepList.innerText = "";

  const selectedFilter = getSelectedFilter();
  const filteredTasks = state.prepTasks.filter((prepTasks) => {
    if (selectedFilter === "all") {
      return true;
    } else if (selectedFilter === "done") {
      return prepTasks.done;
    } else {
      return !prepTasks.done;
    }
  });

  filteredTasks.forEach(function (prepTask) {
    const listEl = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "prepTask" + prepTask.id;
    checkbox.checked = prepTask.done;
    console.dir(checkbox);

    checkbox.prepTaskId = prepTask.id;

    const description = document.createElement("label");

    description.htmlFor = checkbox.id;
    description.innerText = prepTask.description;

    listEl.appendChild(checkbox);
    listEl.appendChild(description);

    prepList.appendChild(listEl);
  });
}
function updateTask(event) {
  const id = event.target.prepTaskId;

  const updatedTask = state.prepTasks.find(function (prepTask) {
    return prepTask.id === id;
  });

  updatedTask.done = event.target.checked;
  console.log(state.prepTasks);
}

function removeDoneTodos() {
  const indexes = [];
  for (let i = state.prepTasks.length - 1; i >= 0; i--) {
    if (state.prepTasks[i].done === true) {
      state.prepTasks.splice(i, 1);
    }
  }
  renderPrepTasks();
  localStorage.setItem("prepTasks", JSON.stringify(state.prepTasks));
}

restoreTasks();
renderPrepTasks();
