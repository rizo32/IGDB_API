import AbstractView from './AbstractView.js';

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
        <h1>Setting</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, quam! Perspiciatis nihil voluptatum dicta a ducimus! A cumque libero esse sint corporis et doloribus nostrum, deserunt minima. Magni, aut sunt!</p>
        <p>
            <a href="/settings" data-link>Voir les settings</a>
        </p>
        `;
    }
}