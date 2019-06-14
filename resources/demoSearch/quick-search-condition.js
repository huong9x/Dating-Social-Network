//implements ICondition

class QuickSearchCondition{
    
    constructor(keyword){
        this.keyword = keyword;
        
    }
    
    async getQuery(){
        return await knex
                        .select('*')
                        .from('books')
                        .where({ title: this.keyword})
                        .orWhere({ author: this.keyword})
                        .orWhere({ description: this.keyword})
    }
}