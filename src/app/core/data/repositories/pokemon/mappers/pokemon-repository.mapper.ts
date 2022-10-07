import {Mapper} from "../../../../base/utils/mapper";
import {PokemonEntity} from "../entities/pokemon-entity";
import {PokemonModel} from "../../../../domain/models/pokemon.model";

export class PokemonImplementationRepositoryMapper extends Mapper<PokemonEntity, PokemonModel> {
  mapFrom(param: PokemonEntity): PokemonModel {
    console.log(param)
    return {
      name: param.results[0].name,
      url: param.results[0].url
    };
  }
  mapTo(param: PokemonModel): any {
    return {

      }
    }
}
