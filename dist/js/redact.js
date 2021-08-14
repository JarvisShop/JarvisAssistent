function getQuestions() {
  window.parent.postMessage('getQuestions', '*');
}

function hideLoading() {
  window.parent.postMessage('hideLoading', '*');
}

function showLoading() {
  window.parent.postMessage('showLoading', '*');
}

function objSize(obj) {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var questions = {};
getQuestions();

window.addEventListener('message', function (text) {
  const data = JSON.parse(text.data);

  if (objSize(data.questions) > 0) {
    questions = data.questions;
  }
  for (let i = 0; i < objSize(window.questions); i++) {
    console.log(window.questions[i]);
  }
  drawQuestions();
});


function drawQuestions() {
  if (document.querySelector('.questions') != null) {
    let oldQuestions = document.querySelector('.questions');
    oldQuestions.remove();
  }

  let bigDiv = document.createElement('div');
  bigDiv.style.display = 'grid';
  bigDiv.className = `questions`;

  for (let i = objSize(window.questions) - 1; i >= 0; i--) {

    let div = document.createElement('div');

    div.className = `agent-question`;

    div.setAttribute('number', `${i}`);
  	div.innerHTML = window.questions[i];

  	// DIV style: chat bubbles

  	div.style.padding = '12px';
  	div.style.marginRight = 'auto';
  	div.style.marginBottom = '4px';
    div.style.borderRadius = '40px';
    div.style.color = '#253339';
    div.style.border = '1px solid #e5eaed';
    div.style.display = 'inline-block';
    div.style.position = 'relative';
    div.style.backgroundColor = '#feffff';
    div.style.minWidth = '26px';
    div.style.wordWrap = 'break-word';
    div.style.WebkitBoxFlex = '0';
    div.style.MsFlexPositive = '0';
    div.style.flexGrow = '0';
    div.style.whiteSpace = 'pre-wrap';
    div.style.fontWeight = 'bold';
    div.style.textDecoration = 'underline';
    div.style.cursor = 'pointer';
    div.style.animation = 'show-data-v-325a1bc6 .8s cubic-bezier(.4,0,.2,1) forwards';

    div.onclick = function(){
      document.querySelector('.chat-field-input').value = questions[i];
      activateInput();
      document.documentElement.style.setProperty('--animation-timing', 'none');
      
      setTimeout(() => { if (document.querySelector(".chat-field-action").title == 'Отправить') enterMessage()}, 50);

      setTimeout(() => { document.documentElement.style.setProperty('--animation-timing', 'cubic-bezier(.4,0,.2,1)');}, 100);
      if (document.querySelector('.agent-icon') != null) { setTimeout(() => { showLoading(); }, 200); }

      if(document.querySelector('.agent-icon') != null) {
      	let timerId = setInterval(() => reloadRedact(), 1000);
        console.log('Timer setted');
      }
    };
    bigDiv.prepend(div);  
  }


  if (document.querySelector('.agent-icon') != null) {

  	let el = document.querySelector('.agent-icon');
  	el.after(bigDiv);

  } else if (document.querySelector('#message') != null) {
    /*document.querySelector('.chat').addEventListener("DOMNodeInserted",function(e){
      let a = document.querySelector('.chat > section').lastElementChild;
      let el = a.children[a.children.length - 2].children[0];
      let lastTextContent = el.textContent;
      if (lastTextContent.includes('+38')) {
        let delSpaces = lastTextContent.split(' ').join('');
        let index = delSpaces.indexOf('+38');
        let number = delSpaces.slice(index, index + 15);
        let numHref = number.replace('(','').replace(')','');
        let first = lastTextContent.indexOf('+38');
        let last = lastTextContent.indexOf(number.slice(number.length - 2, number.length)) + 2;
        let numInStr = lastTextContent.slice(first, last);
        let replaceEl = '/_(*)_/';
        lastTextContent = lastTextContent.replace(numInStr, replaceEl);
        let els = lastTextContent.split(replaceEl);
        el.innerHTML = '';
        let link = document.createElement('a');
        for (let i = 0; i < els.length - 1; i++){
            let tnod = document.createTextNode(els[i]);
            el.appendChild(tnod);
            link.innerHTML = numInStr;
            link.href = `tel:${numHref}`;
            el.appendChild(link);
        }
        let tnod2 = document.createTextNode(els[els.length-1]);
        el.appendChild(tnod2);
      }
    },false);*/


  	let el = document.querySelector('#message');
  	el.prepend(bigDiv);

  }
  hideLoading();
}

function reloadRedact() {
  console.log('Interval ticked');
	if(document.querySelector('#message') != null) {
    console.log('Interval cleared');
    location.reload();
	}
}

function enterMessage() {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  const cb = document.querySelector('.chat-field-action');
  const cancelled = !cb.dispatchEvent(event);
}

function activateInput() {
  const event = new MouseEvent('input', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  const cb = document.querySelector('.chat-field-input');
  const cancelled = !cb.dispatchEvent(event);
}