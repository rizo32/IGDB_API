import AbstractView from './AbstractView.js';

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Stocks");
    }

    async getHtml() {
        async function getData(url){
            const response = await fetch(url);
            // return response.json();
            const data = await response.json();
            console.log(data);
        }
        const data = await getData('/stocks');
        return data;
        // const data = await getData('/static/upload/stock_titles.json');

        let listStocks = '<ul>'
        for(let i in data){
            listStocks += `<li><a href='/stock-view/${data[i]}' data-link>${data[i]}</a></li>`
        }
        listStocks += '</ul>';

        return `
        <h1>Stocks</h1>
        ${listStocks}
        `;
    }
}