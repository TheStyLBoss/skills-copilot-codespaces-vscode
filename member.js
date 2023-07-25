function skillsMember() {
  var member = {
    name: "John Doe",
    age: 34,
    skills: ["Javascript", "React", "Redux", "Node", "Express"],
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94101"
    },
    getSkills: function() {
      return this.skills;
    },
    getAge: function() {
      return this.age;
    }
  };
  return member;
}