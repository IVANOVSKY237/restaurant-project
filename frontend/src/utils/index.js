
export const getBgColor =()=>{
  const bgarr = [
    "#b73e3e",
    "#5b45b0",
    "#7f167f",
    "#735f32",
    "#1d2569",
    "#285430"
  ]
  const randomBg = Math.floor(Math.random()* bgarr.length);
  const color = bgarr[randomBg];
  return color;
};

export const getAvatarName = (name) => {
  if(!name) return "";
  return name.split(" ").map(word => word[0]).join('').toUpperCase();
}
