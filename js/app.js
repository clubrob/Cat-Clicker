const CatModel = (function () {
  // Cat object
  const Cat = function (id, name) {
    this.id = id;
    this.name = name;
    this.image = `img/${this.name.toLowerCase()}-${this.id}.jpg`;
    this.count = 0;
  };

  const catCollection = [];
  catCollection.push(
    new Cat(1, 'Stanley'),
    new Cat(2, 'Dusty'),
    new Cat(3, 'Mollie'),
    new Cat(4, 'Mother'),
    new Cat(5, 'Minnie')
  );

  return {
    catCollection: catCollection,
    getCat: function (id = undefined) {
      let currentCat;
      if (id === undefined) {
        currentCat = catCollection[0];
        return currentCat;
      } else {
        catCollection.forEach((cat) => {
          if (cat.id === id) {
            currentCat = cat;
          }
        });
        return currentCat;
      }
    }
  };
})();

const CatView = (function () {

  function render(cat) {
    const catHead = document.querySelector('.catHead');
    const catImg = document.querySelector('.catImage');
    const count = cat.count.toString();

    catHead.innerHTML = `
      ${cat.name}: <span class="catCounter" id="clicks_${cat.id}">${count}</span>
    `;
    catImg.className = `catImage cat_${cat.id}`;
    catImg.setAttribute('src', cat.image);
    catImg.setAttribute('alt', cat.name);
  }

  function renderNav(collection) {
    collection.forEach((item) => {
      const li = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.setAttribute('data-cat', `${item.id}`);
      anchor.setAttribute('href', '#');
      anchor.className = 'cat';
      anchor.appendChild(document.createTextNode(`${item.name}`));
      li.appendChild(anchor);
      document.querySelector('#catList').appendChild(li);
    });
  }

  return {
    render: render,
    renderNav: renderNav
  };
})();

const App = (function () {

  let currentCat = CatModel.getCat();
  // Event Handlers
  function catSelect(e) {
    if (e.target.classList.contains('cat')) {
      const catId = parseInt(e.target.dataset.cat);
      CatModel.catCollection.forEach((cat) => {
        if (cat.id === catId) {
          currentCat = CatModel.getCat(cat.id);
          CatView.render(currentCat);
        }
      });
    }
    e.preventDefault();
  }

  function addToCount(e) {
    if (e.target.classList.contains(`cat_${currentCat.id}`)) {
      const catClicks = document.querySelector(`#clicks_${currentCat.id}`);
      catClicks.textContent++;
      const count = catClicks.textContent;
      persistCount(currentCat, count);
    }
  }

  function persistCount(currentCat, count) {
    CatModel.catCollection.forEach((cat) => {
      if (currentCat.id === cat.id) {
        cat.count = count;
      }
    });
  }

  function loadEventListeners() {
    document.querySelector('#catContainer').addEventListener('click', addToCount);
    document.querySelector('#catList').addEventListener('click', catSelect);
  }

  return {
    init: function () {
      currentCat = CatModel.getCat(currentCat.id);
      CatView.renderNav(CatModel.catCollection);
      CatView.render(currentCat);
      loadEventListeners();
    }
  };
})(CatModel, CatView);

App.init();