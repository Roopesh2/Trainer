const $ = el => document.querySelector(el);
var size = 6;
var list;
var time = 10;// in s

const createBtn = $(".create"); // list creator
const settingsBtn = $(".settings");// settings view
const hideBtn = $(".hide"); // hider
const displayView = $(".display"); // content is displayed here

const setSize = (v) => {size = v};
const setTime = (v) => {time = Number(v) || 10};
const randomword = () => wordList[Math.min(Math.round(Math.random()*wordList.length), wordList.length)]
const create = () => {
  displayView.innerHTML = "<ul>";
  var lst = [];
  for (var i = 0; i < size; i++) {
    var rw = randomword();
    if (lst.includes(rw)) {
      i--;
      continue;
    } else {
      lst.push(rw);
      displayView.innerHTML += "<li>"+rw+"</li>";
    }
  }
  displayView.innerHTML += "</ul>";
};
const settings = () => {
  displayView.innerHTML = `
  <div>
    <table class="sett">
      <tr>
        <td>Size</td>
        <td><input id="sizei" type="number" onchange="setSize(this.value)" value=5></td>
      </tr>
      <tr>
        <td>Timeout</td>
        <td><input id="timeouti" type="number" onchange="setTime(this.value)" value=30></td>
      </tr>
    </table>
  </div>
  `;
};
const hidelist = (el) => {
  var e = el.target;
  list = displayView.innerHTML;
  displayView.innerHTML = "";
  e.disabled = true;
  setTimeout(function () {
    e.disabled = false;
    e.innerHTML = "Show";
    displayView.innerHTML = "Recall"
    e.onclick = function () {
      e.innerHTML = "Hide";
      displayView.innerHTML = list;
      e.onclick = hidelist;
    }
  }, time * 1000);
}

createBtn.onclick = create;
settingsBtn.onclick = settings;
hideBtn.onclick = hidelist