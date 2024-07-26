let container = document.querySelector(".container");
async function getData() {
  try {
    let response = await fetch("https://northwind.vercel.app/api/suppliers");
    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    let data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.error("Reference error occured", error);
    } else if (error instanceof TypeError) {
      console.error("Type error occured", error);
    } else {
      console.error("An error occured", error);
    }
  }
}
async function showData() {
  try {
    let data = await getData();
    data.map((element) => {
      let item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML += `
               <div class="img">
               <img src='https://dubaitickets.tours/wp-content/uploads/2023/03/img-worlds-of-adventure-dubai-ticket-11-1.jpg' alt=''" />
             </div>
             <div class="heading">
               <h3>${element.companyName}</h3>
               <div class="text">
                 <p>Rating: ${element.contactName}</p>
                 <p>Price: ${element.address?.city}</p>
                 <p>Stock: ${element.address?.country}</p>
               </div>
             </div>
             <div class="btn">
               <button onclick={delData(${element.id})} id=item${element.id}>Delete</button>
             </div>`;
      container.appendChild(item);
    });
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.error("Reference error occured", error);
    } else if (error instanceof TypeError) {
      console.error("Type error occured", error);
    } else {
      console.error("An error occured", error);
    }
  }
}
showData();
async function delData(id) {
  try {
    let btn = document.querySelector(`#item${id}`);
    btn.parentElement.parentElement.remove();
    await fetch("https://northwind.vercel.app/api/suppliers/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.error("Reference error occured", error);
    } else if (error instanceof TypeError) {
      console.error("Type error occured", error);
    } else {
      console.error("An error occured", error);
    }
  }
}
const submit = document.querySelector(".submit");
async function postData(e) {
  e.preventDefault();
  try {
    let inputs = document.querySelectorAll("input");
    let check = true;
    for (let input of inputs) {
      if (input.value.trim() === "") {
        check = false;
        break;
      }
    }
    if (check) {
      function getFormData() {
        return {
          companyName: document.querySelector(".companyName").value.trim(),
          contactName: document.querySelector(".contactName").value.trim(),
          contactTitle: document.querySelector(".contactTitle").value.trim(),
          address: {
            street: document.querySelector(".street").value.trim(),
            city: document.querySelector(".city").value.trim(),
            region: document.querySelector(".region").value.trim(),
            postalCode: document.querySelector(".postalCode").value.trim(),
            country: document.querySelector(".country").value.trim(),
            phone: document.querySelector(".phone").value.trim(),
          },
        };
      }
      let obj = getFormData();
      let response = await fetch(
        "https://northwind.vercel.app/api/suppliers/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      document.querySelector("form").reset();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } else {
      alert("Fill all the inputs");
    }
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.error("Reference error occured", error);
    } else if (error instanceof TypeError) {
      console.error("Type error occured", error);
    } else {
      console.error("An error occured", error);
    }
  }
}
submit.addEventListener("click", postData);
