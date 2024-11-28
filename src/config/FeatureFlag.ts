type FeatureFlagKey = 'enableAxiosAuthInterceptors';

type FeatureFlagValue = boolean;

type FeatureFlagsConfig = Record<FeatureFlagKey, FeatureFlagValue>;

class FeatureFlag {
  private flags: FeatureFlagsConfig;

  constructor(initialFlags: FeatureFlagsConfig) {
    this.flags = initialFlags;
  }

  public isEnabled(flag: FeatureFlagKey): boolean {
    if (!(flag in this.flags)) {
      throw Error('Feature flag does not exist')
    }
    return this.flags[flag] ?? false; // Default to false if the flag doesn't exist
  }

  public enable(flag: FeatureFlagKey): void {
    this.flags[flag] = true;
  }

  public disable(flag: FeatureFlagKey): void {
    this.flags[flag] = false;
  }

  public toggle(flag: FeatureFlagKey): void {
    this.flags[flag] = !this.flags[flag];
  }
}

const featureFlags = new FeatureFlag({
  enableAxiosAuthInterceptors: false,
});

export default featureFlags;
