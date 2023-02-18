export default class {
    constructor(params){
        this.params = params;
    }
    setTitle(title){
        // Pour faire la navigation
        document.title = title;
    }

    // C'est ici qu'on va mettre le contenu, on va le mettre dans l'App à la fin
    async getHtml(){
        return '';
    }
}