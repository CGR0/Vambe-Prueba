import { Repository, SelectQueryBuilder } from 'typeorm';

export async function getAllQueryWithEntityJoin(
  primaryEntity: string,
  entities: string,
  repository: Repository<any>,
): Promise<SelectQueryBuilder<any>> {
  const query = repository.createQueryBuilder(primaryEntity);

  return joinEntities(query, entities, primaryEntity);
}

export async function getByIdQueryWithEntityJoin(
  primaryEntity: string,
  id: string,
  entities: string,
  repository: Repository<any>,
): Promise<SelectQueryBuilder<any>> {
  const query = repository
    .createQueryBuilder(primaryEntity)
    .where(`${primaryEntity}.id = :id`, { id });

  return joinEntities(query, entities, primaryEntity);
}

async function joinEntities(
  query: SelectQueryBuilder<any>,
  entities: string,
  primaryEntity: string,
): Promise<SelectQueryBuilder<any>> {
  if (!entities) {
    return query;
  }

  const entitiesArray = entities.split(',');
  const joinedEntities: Set<string> = new Set();

  for (const entity of entitiesArray) {
    const subEntities = entity.split('.');
    let currentEntity = primaryEntity;
    for (let i = 0; i < subEntities.length; i++) {
      const subEntity = subEntities[i];
      if (joinedEntities.has(subEntity)) continue;
      query.leftJoinAndSelect(`${currentEntity}.${subEntity}`, subEntity);
      joinedEntities.add(subEntity);
      currentEntity = subEntity;
    }
  }

  return query;
}
