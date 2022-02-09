import { SetModel } from "../models/SetModel";
import { UserModel } from "../models/UserModel";
import { VocabularyModel } from "../models/VocabularyModel";
import { VocabularyDefinitionModel } from "../models/VocabularyDefinitionModel";
import { VocabularyCategoryModel } from "../models/VocabularyCategoryModel";
import { VocabularyWritingModel } from "../models/VocabularyWritingModel";

export interface ModelList{
  userModel: UserModel;
  setModel: SetModel;
  vocabularyModel: VocabularyModel;
  vocabularyDefinitionModel: VocabularyDefinitionModel;
  vocabularyCategoryModel: VocabularyCategoryModel;
  vocabularyWritingModel: VocabularyWritingModel;
};