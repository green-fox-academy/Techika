const galleryLocation = './gallery/';
const imageNames = [
  {
    filename: 'oaktree.jpg',
    title: 'Lonely Oak Tree',
    story: 'Once upon a time there was a lonely oak tree.',
  },
  {
    filename: 'bunny.jpg',
    title: 'Window Licking Bunny',
    story: 'Once upon a time there was a bunny who loved to look out the window...',
  },
  {
    filename: 'fox.jpg',
    title: 'The Speaking Fox',
    story: 'I was always wondering, What does the fox say?',
  },
  {
    filename: 'gekko.jpg',
    title: 'The Brave Gecko',
    story: 'Once upon a time there was geecko...',
  },
  {
    filename: 'hotdog.jpg',
    title: 'The Hottest Dog',
    story: 'The fine art of making proper American hotdog',
  },
];

window.onload = function () {
  const thumbnailTemplate = document.getElementById('thumbnail_0').cloneNode(true);
  document.getElementById('thumbPic_0').src = galleryLocation + imageNames[0].filename;
  document.getElementById('thumbPic_0').dataset.story = imageNames[0].story;
  document.getElementById('thumbPic_0').title = imageNames[0].title;
  document.getElementById('upArrow_0').classList.add('active');
  document.getElementById('thumbnail_0').classList.add('active');
  document.getElementById('picture').src = galleryLocation + imageNames[0].filename;
  document.getElementById('storyTitle').textContent = imageNames[0].title;
  document.getElementById('storyBody').textContent = imageNames[0].story;

  imageNames.forEach((_, index) => {
    if (index === 0) {
      return;
    }
    const tempNode = thumbnailTemplate.cloneNode(true);
    tempNode.querySelector('#thumbPic_0').src = galleryLocation + imageNames[index].filename;
    tempNode.querySelector('#thumbPic_0').title = imageNames[index].title;
    tempNode.querySelector('#thumbPic_0').dataset.story = imageNames[index].story;
    tempNode.querySelector('#thumbPic_0').id = 'thumbPic_' + index;
    tempNode.querySelector('#upArrow_0').id = 'upArrow_' + index;
    tempNode.id = 'thumbnail_' + index;
    document.getElementById('thumbnailContainer').appendChild(tempNode.cloneNode(true));
  });
};

function pickThumbnail(target) {
  document.querySelectorAll('.active').forEach((element) => {
    element.classList.remove('active');
  });
  target.classList.add('active');
  target.querySelector('.arrow-up').classList.add('active');
  document.getElementById('picture').src = target.querySelector('.thumbPic').src;
  document.getElementById('storyTitle').textContent = target.querySelector('.thumbPic').title;
  document.getElementById('storyBody').textContent = target.querySelector(
    '.thumbPic'
  ).dataset.story;
}

function pageLeft() {
  const boxList = Array.prototype.slice.call(
    document.querySelector('#thumbnailContainer').children
  );
  const currIndex = boxList.indexOf(document.querySelector('.thumbnail-box.active'));
  if (currIndex === 0) {
    pickThumbnail(document.getElementById('thumbnailContainer').children[boxList.length - 1]);
  } else {
    pickThumbnail(document.getElementById('thumbnailContainer').children[currIndex - 1]);
  }
}

function pageRight() {
  const boxList = Array.prototype.slice.call(
    document.querySelector('#thumbnailContainer').children
  );
  const currIndex = boxList.indexOf(document.querySelector('.thumbnail-box.active'));
  if (currIndex === boxList.length - 1) {
    pickThumbnail(document.getElementById('thumbnailContainer').children[0]);
  } else {
    pickThumbnail(document.getElementById('thumbnailContainer').children[currIndex + 1]);
  }
}
