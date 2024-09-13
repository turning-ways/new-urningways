import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";

function useCountryState(defaultCountry: string) {
  const [countryArray, setCountryArray] = useState<string[]>([]);
  const [stateArray, setStateArray] = useState<string[]>([]);

  useEffect(() => {
    setCountryArray(Country.getAllCountries().map((c) => c.name));
  }, []);

  useEffect(() => {
    setStateArray(State.getStatesOfCountry(defaultCountry).map((s) => s.name));
  }, [defaultCountry]);

  return { countryArray, stateArray };
}

export default useCountryState;
