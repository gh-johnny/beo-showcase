type FeatureFlagKey = 'enableAxiosAuthInterceptors' | 'enableReturnMockDataIfTimedOut';

type FeatureFlagValue = { enabled: boolean };

type FeatureFlagsConfig = Record<FeatureFlagKey, FeatureFlagValue>;

class FeatureFlag {
  private flags: FeatureFlagsConfig;

  constructor(initialFlags: FeatureFlagsConfig) {
    this.flags = initialFlags;
  }

  public isEnabled(flag: FeatureFlagKey): boolean {
    if (!(flag in this.flags)) {
      throw new Error(`Feature flag "${flag}" does not exist`);
    }
    return this.flags[flag].enabled;
  }

  public enable(flag: FeatureFlagKey): void {
    this.flags[flag] = { enabled: true };
  }

  public disable(flag: FeatureFlagKey): void {
    this.flags[flag] = { enabled: false };
  }

  public toggle(flag: FeatureFlagKey): void {
    this.flags[flag].enabled = !this.flags[flag].enabled;
  }
}

const featureFlags = new FeatureFlag({
  enableAxiosAuthInterceptors: { enabled: false },
  enableReturnMockDataIfTimedOut: { enabled: true },
});

export default featureFlags;
