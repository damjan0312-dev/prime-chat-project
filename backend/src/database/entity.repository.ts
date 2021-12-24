import {
    AnyKeys,
    Document,
    FilterQuery,
    Model,
    UpdateQuery,
    Types
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findById(id: string, populateWith?: string) {
        return this.entityModel
            .findById(new Types.ObjectId(id))
            .populate(populateWith)
            .exec();
    }

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>,
        populateWith?: string
    ): Promise<T | null> {
        console.log(entityFilterQuery);
        return this.entityModel
            .findOne(entityFilterQuery, {
                __v: 0,
                ...projection
            })
            .populate(populateWith)
            .exec();
    }

    async find(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>,
        populateWith?: string
    ): Promise<T[] | null> {
        return this.entityModel
            .find(entityFilterQuery, {
                __v: 0,
                ...projection
            })
            .populate(populateWith);
    }

    async create(createEntityData: AnyKeys<T>): Promise<T> {
        const entity = new this.entityModel(createEntityData);
        return entity.save();
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>
    ): Promise<T | null> {
        return this.entityModel.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            {
                new: true
            }
        );
    }

    async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(
            entityFilterQuery
        );
        return deleteResult.deletedCount >= 1;
    }

    async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteOne(
            entityFilterQuery
        );
        return deleteResult.deletedCount === 1;
    }
}
