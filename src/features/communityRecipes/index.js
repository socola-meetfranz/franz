import { reaction } from 'mobx';
import { CommunityRecipesStore } from './store';

const debug = require('debug')('Franz:feature:communityRecipes');

export const DEFAULT_SERVICE_LIMIT = 1000;

export const communityRecipesStore = new CommunityRecipesStore();

export default function initCommunityRecipes(stores, actions) {
  const { features } = stores;

  communityRecipesStore.start(stores, actions);

  // Toggle communityRecipe premium status
  reaction(
    () => (
      features.features.isCommunityRecipesIncludedInCurrentPlan
    ),
    (isPremiumFeature) => {
      isPremiumFeature = true;
      debug('Community recipes is premium feature: ', isPremiumFeature);
      communityRecipesStore.isCommunityRecipesIncludedInCurrentPlan = isPremiumFeature;
    },
    {
      fireImmediately: true,
    },
  );
}
