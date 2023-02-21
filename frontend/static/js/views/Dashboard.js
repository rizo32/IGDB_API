import AbstractView from '../views/AbstractView.js';

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
        <h1>Bienvenue Marcos!</h1>
        <p class="py-3">Le seul et unique visiteur de cette page!</p>
        <p class="btn btn-primary">J'accepte les dons</p>
        `;
    }
}