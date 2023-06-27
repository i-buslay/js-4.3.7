const text = document.getElementById('text');
text.addEventListener('keyup', debounce(search.bind(this), 2000));

const info = document.querySelector('.info');
const addInfo = document.querySelector('.add');



async function search() {
    if (text.value) {
        return (await fetch(`https://api.github.com/search/repositories?q=${text.value}`)).json().then(res => {
            const delEl = info.children;
            Array.from(delEl).forEach(i => i.remove());

            const obj = {};

            for (let i = 0; i < 5; i++) {
                try {
                    const el = document.createElement('div');
                    el.classList.add('container');
                    el.textContent = res.items[i].name;
                    info.append(el);
                } catch {
                    break;
                }
            }

            info.addEventListener('click', (e) => {
                if (e.target !== info) {
                    e.target.classList.add('container-color');
                }
                text.value = null;

                for (let i = 0; i < 5; i++) {
                    try {
                        if (e.target.textContent === res.items[i].name) {
                            const el = document.createElement('div');
                            el.classList.add('added');
                            el.innerHTML += `Name: ${res.items[i].name} <br> Owner: ${res.items[i].owner.login} <br> Stars: ${res.items[i].stargazers_count}`;
    
                            const btn = document.createElement('button');
                            btn.classList.add('button');
                            el.appendChild(btn);
    
                            addInfo.append(el);

                            el.addEventListener('click', (e) => {
                                if (e.target.tagName === 'BUTTON') {
                                    el.remove();
                                }
                            })
                        }
                    } catch {
                        break;
                    }
                }

            })
        })
    }
}

function debounce(fn, ms) {
    let count;
    return function(...context) {
      clearTimeout(count);
      count = setTimeout(() => {
        fn.apply(this, context);
      }, ms)
    }
};