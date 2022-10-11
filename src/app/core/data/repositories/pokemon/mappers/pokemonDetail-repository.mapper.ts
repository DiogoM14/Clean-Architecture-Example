import { Mapper } from '../../../../base/utils/mapper';
import { PokemonDetailEntity } from '../entities/pokemonDetail-entity';
import { PokemonDetailModel } from '../../../../domain/models/pokemonDetail.model';

export class PokemonDetailImplementationRepositoryMapper extends Mapper<
  PokemonDetailEntity,
  PokemonDetailModel
> {
  mapFrom(param: PokemonDetailEntity): PokemonDetailModel {
    return {
      name: param.name,
      weight: param.weight,
      front_image: param.sprites.front_default,
      back_image: param.sprites.back_default,
    };
  }

  mapTo(param: PokemonDetailModel): any {
    return {};
  }
}
