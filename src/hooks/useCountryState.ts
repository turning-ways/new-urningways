import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";

function useCountryState(initialCountry: string) {
  const [countryArray, setCountryArray] = useState<string[]>([]);
  const [stateArray, setStateArray] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);

  // Get all countries on component mount
  useEffect(() => {
    setCountryArray(Country.getAllCountries().map((c) => c.name));
  }, []);

  // Update state array when country changes
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry);
      setStateArray(states.map((s) => s.name));
    } else {
      setStateArray([]);
    }
  }, [selectedCountry]);


  return {
    countryArray,
    stateArray,
    setSelectedCountry, // Expose this to update the country from the form
  };
}

export default useCountryState;
