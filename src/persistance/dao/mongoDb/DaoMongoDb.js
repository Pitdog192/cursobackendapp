export default class DaoMongoDB {
    constructor(model) {
        this.model = model
    }

    async getOne(filter) {
        try {
            return await this.model.findOne(filter)
        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            const result = await this.model.findById(id);
            if (!result) {
                console.warn(`No se encontró ningún registro con el ID: ${id}`);  // Usamos console.warn en lugar de lanzar un error.
                return null;  // Devolvemos null si no se encuentra el usuario.
            }
            return result;
        } catch (error) {
            console.error(`Error en getById: ${error.message}`);  // Muestra el error en la consola.
            throw error;  // Lanza el error sin crear un nuevo objeto de error.
        }
    }

    async getCartById(id) {
        try {
            return await this.model.findById(id).populate("cart")
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAll(query, limit = 10, page = 1, sortOrder) {
        try {
            return await this.model.paginate(query, {
                page: page,
                limit: limit,
                sort: sortOrder,
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async create(obj) {
        try {
            return await this.model.create(obj)
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(id, obj) {
        try {
            return await this.model.findByIdAndUpdate(id, obj, { new: true })
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateOne(filter, obj) {
        try {
            return await this.model.findOneAndUpdate(filter, obj, { new: true })
        } catch (error) {
            throw new Error(error)
        }
    }

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error)
        }
    }

    async getCartProducts(id) {
        try {
            return await this.model.findById(id).populate({
                path: "products.pid",
                select: "title description code price status stock category",
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async increaseProdQuantity(cid, pid, quantity) {
        try {
            return await this.model.findOneAndUpdate(
                { _id: cid, "products.pid": pid },
                { $set: { "products.$.quantity": quantity } },
                { new: true }
            );
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProd(cid, pid) {
        try {
            return await this.model.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { pid: pid } } },
                { new: true }
            )
        } catch (error) {
            throw new Error(error)
        }
    }

    async clearCart(cartId) {
        try {
            return await this.model.findByIdAndUpdate(
                cartId,
                { $set: { products: [] } },
                { new: true } // Devuelve el documento actualizado
            );
        } catch (error) {
            throw new Error(error)
        }
    }

    async updatePass(userId, pass){
        try {
            return await this.model.findByIdAndUpdate(
                userId,
                { $set: pass },
                { new: true } // Devuelve el documento actualizado
            );
        } catch (error) {
            throw new Error(error)
        }
    }

    async setUserToken(userId, token, expiresIn) {
        try {
            const updateFields = {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + expiresIn
            };
            
            return await this.model.findByIdAndUpdate(
                userId,
                { $set: updateFields },
                { new: true } // Devuelve el documento actualizado
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAllProducts(){
        try {
            const response = await this.model.deleteMany({});
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updatePremium(user, changes){
        try {
            return await this.model.findByIdAndUpdate(
                user,
                { $set: changes },
                { new: true } // Devuelve el documento actualizado
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    async last_connection(userId, newDate) {
        try {
            // Update the last connection date for the given user
            const updatedUser = await this.model.findByIdAndUpdate(
                userId,
                { $set: { last_connection: newDate } },
                { new: true } // Return the updated document
            );
    
            // Check if the user was found and updated
            if (!updatedUser) {
                throw new Error(`User with ID ${userId} not found`);
            }
    
            return updatedUser;
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error updating last connection:', error);
            // Throw a more specific error
            throw new Error(`Failed to update last connection: ${error.message}`);
        }
    }
}
