//implements ICondition

class BasicSearchCondition{
    
    constructor(title, author, price){
        this.title = title;
        this.author = author;
        //price = {min: a, max:b}
        this.price = price;   
    }
    
    async getQuery(){
        return await knex
                        .select('*')
                        .from('books')
                        .where({ title: this.title, author: this.author })
                        .whereBetween('price', [price.min, price.max]);
    }
}