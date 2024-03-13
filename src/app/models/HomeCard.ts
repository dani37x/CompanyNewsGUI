export class HomeCard {
    id!: number;
    title!: string
    text!: string;
    image!: string;
    author!: string;
    authorImage!: string;
    date!: Date

    constructor(id: number, title: string, text: string, image: string, author: string, authorImage: string, date: Date) {
        this.id = id;
        this.title = title
        this.text = text;
        this.image = image
        this.author = author;
        this.authorImage = authorImage;
        this.date = date;
    }
}
