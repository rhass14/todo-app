const prepDescription = document.getElementById("description");
const btnAdd = document.getElementById("btn-add");
const prepList = document.getElementById("prep-list");

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

const state = {
  prepTasks: [
    { description: "check passport validity", done: true, id: 1 },
    { description: "pack camera", done: false, id: 2 },
  ],
};

btnAdd.addEventListener("click", addPrepTask);

prepList.addEventListener("change", updateTask);

function addPrepTask(event) {
  event.preventDefault();
  const newPrepTask = {
    description: prepDescription.value,
    done: false,
    id: Math.floor(Math.random() * 5000000),
  };

  state.prepTasks.push(newPrepTask);
  localStorage.setItem("prepTasks", JSON.stringify(state.prepTasks));

  const storedTask = JSON.parse(localStorage.getItem("prepTasks"));

  if (storedTask) {
    state.prepTasks = storedTask;
  }

  renderPrepTasks();
}

function renderPrepTasks() {
  prepList.innerText = "";

  const selectedFilter = getSelectedFilter();

  state.prepTasks.filter((prepTasks) => {
    if (selectedFilter === "all") {
      return true;
    } else if (selectedFilter === "done") {
      return prepTasks.done;
    } else {
      return !prepTasks.done;
    }
  });

  state.prepTasks.forEach(function (prepTask) {
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

function removeDoneTask(event) {
  const taskId = event.target.id;
  const prepTasks = state.prepTasks;
  console.log(taskId);

  const taskToUpdate = prepTasks.find(function (prepTask) {
    return prepTask.id.toString === taskId;
  });
  if (doneTask) {
    taskToUpdate.done = event.target.checked;
  }
}

function removeDuplicateItem(event) {
  const duplicateId = event.target.prepTaskId;
  const duplicateTask = state.prepTasks;

  const duplicateItemIndex = duplicateTask.findIndex(function (prepTask) {
    return prepTask.description === event.target.description;
  });

  if (duplicateItemIndex !== -1) {
    duplicateTask.splice(duplicateItemIndex, 1);
  }
}
renderPrepTasks();
