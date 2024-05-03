class BaseCrudRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const items = await this.model.find();
            return items;
        } catch (error) {
            console.error("Error fetching all items:", error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const item = await this.model.findById(id);
            return item;
        } catch (error) {
            console.error("Error fetching item by ID:", error);
            throw error;
        }
    }

    async create(data) {
        try {
            const newItem = new this.model(data);
            await newItem.save();
            return newItem;
        } catch (error) {
            console.error("Error creating item:", error);
            throw error;
        }
    }

    async update(id, newData) {
        try {
            const updatedItem = await this.model.findByIdAndUpdate(id, newData, { new: true });
            return updatedItem !== null;
        } catch (error) {
            console.error("Error updating item:", error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result !== null;
        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    }
}

module.exports = BaseCrudRepository;
