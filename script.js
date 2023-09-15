const prepDescription = document.getElementById("description");
const btnAdd = document.getElementById("btn-add");
const prepList = document.getElementById("prep-list");

// tasks default state

const state = {
  prepTasks: [
    { description: "check passport validity", done: false, id: 1 },
    { description: "pack camera", done: true, id: 2 },
  ],
};

btnAdd.addEventListener("click", addPrepTask);

// add tasks
prepList.addEventListener("change", updateTask);

//store tasks into local storage
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

  // push tasks
  state.prepTasks.push(newPrepTask);

  //(re-)load tasks into local storage
  localStorage.setItem("prepTasks", JSON.stringify(state.prepTasks));

  restoreTasks();
  renderPrepTasks();
}

// show tasks by selected filter

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
// read prepTaskID from DOM
function updateTask(event) {
  const id = event.target.prepTaskId;

  const updatedTask = state.prepTasks.find(function (prepTask) {
    return prepTask.id === id;
  });

  updatedTask.done = event.target.checked;
  console.log(state.prepTasks);
}

restoreTasks();
renderPrepTasks();
