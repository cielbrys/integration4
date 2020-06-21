import Camping from '../assets/images/Tips/Camping.svg';
import Roads from '../assets/images/Tips/Roads.svg';
import Showering from '../assets/images/Tips/Showering.svg';
import Bathroom from '../assets/images/Tips/Bathroom.svg';
import Supplies from '../assets/images/Tips/Supplies.svg';

export const tips = [
  {
    tip: <Text style={style.tipText}>When camping, making a DIY bed in {"\n"} your car by putting your mattras in the {"\n"} back of the car is a top option, or using{"\n"} a tent outside is just as good.{"\n"}{"\n"} Do make sure when looking for a place to sleep at night, it is legal to sleep there.</Text>,
    img: <Camping />
  },
  {
    tip: <Text style={style.tipText}>Try and take the smaller roads to {"\n"} make your experience as fresh as possible. {"\n"}{"\n"} Try to take brakes after lengthy {"\n"} periods of driving to calm the mind.</Text>,
    img: <Roads />
  },
  {
    tip: <Text style={style.tipText}>Finding places to shower can be {"\n"} difficult being as you won’t have don’t {"\n"} shower in your vehicle.{"\n"}{"\n"} If you have a gym membership for showering and public ba this can be a {"\n"} good option other wise use good old {"\n"} mother nature and wash up in a lake.</Text>,
    img: <Showering />
  },
  {
    tip: <Text style={style.tipText}>Going to the bathroom might also {"\n"} become a problem once your body {"\n"} decides it’s time to go.{"\n"}{"\n"} Look for public bathrooms or if you{"\n"} don’t find any in the proximty, mother {"\n"} nature will be your best friend.</Text>,
    img: <Bathroom />
  },
  {
    tip: <Text style={style.tipText}>Bring food and beverages, preferrably{"\n"} for your entire trip, this will save you{"\n"} money and time.{"\n"}{"\n"} If possible try and fit a minifridge in{"\n"} your vehicle to cool certain foods.{"\n"} Once you run out of food, just look for{"\n"} a supermarket, there should always be{"\n"} one nearby.</Text>,
    img: <Supplies />
  }
]