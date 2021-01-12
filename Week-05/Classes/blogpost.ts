class BlogPost {
  authorName: string;
  title: string;
  text: string;
  publicationDate: string;
  constructor(authorName: string, title: string, text: string, publicationDate: string) {
    this.authorName = authorName;
    this.title = title;
    this.text = text;
    this.publicationDate = publicationDate;
  }
}

const post1: BlogPost = new BlogPost(
  'Tim Urban',
  'Wait bt why',
  'A popular long-form, stick-figure-illustrated blog about almost everything.',
  '2010.10.10'
);

console.log(post1);
console.log(post1.title);
