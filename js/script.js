function renderText() {
    const output = document.getElementById("output");
    const text = document.getElementById("textInput").value;
  
    if (text.length <= 1) {
      alert("Please enter at least one character.");
      return;
    }

    localStorage.setItem("text", text);
    output.innerHTML = "";
  
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.classList.add("char");
      span.textContent = text[i];
      span.draggable = true;
      span.addEventListener("click", toggleSelect);
      span.addEventListener("dragstart", handleDragStart);
      span.addEventListener("dragover", handleDragOver);
      span.addEventListener("drop", handleDrop);
      span.addEventListener("dragenter", handleDragEnter);
      output.appendChild(span);
    }
  
    document.getElementById("textInput").value = "";
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const savedText = localStorage.getItem("text");
  
    if (savedText) {
      document.getElementById("textInput").value = savedText;
      renderText(); 
    }
  });
  
  function toggleSelect(event) {
    if (event.ctrlKey) {
      event.target.classList.toggle("selected");
    } else {
      document.querySelectorAll(".selected").forEach((el) => el.classList.remove("selected"));
      event.target.classList.add("selected");
    }
  }
  
  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", Array.from(event.target.parentNode.children).indexOf(event.target));
  }
  
  function handleDragOver(event) {
    event.preventDefault();
  }
  
  function handleDrop(event) {
    event.preventDefault();
    const output = document.getElementById("output");
    const draggedIndex = event.dataTransfer.getData("text/plain");
    const targetIndex = Array.from(output.children).indexOf(event.target);
    const children = Array.from(output.children);
  
    if (draggedIndex !== targetIndex.toString()) {
      [children[draggedIndex].textContent, children[targetIndex].textContent] = [
        children[targetIndex].textContent,
        children[draggedIndex].textContent,
      ];
    }
  }
  
  function handleDragEnter(event) {
    event.preventDefault();
    if (event.target && event.target.classList.contains("char")) {
      event.target.style.backgroundColor = "#ccc";
    }
  }
  
  document.addEventListener("dragend", (event) => {
    const spans = document.querySelectorAll(".char");
    spans.forEach((span) => {
      span.style.backgroundColor = "";
    });
  });
  