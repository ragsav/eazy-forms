const Demo = ({}) => {
  return (
    <form
      action="http://localhost:4000/api/submit/demo/612117c463c8bf3384cd09ec"
      method="POST"
      className="d-flex flex-column align-items-start"
    >
      <label className="mt-2">checkbox</label>
      <input name="f1" type="checkbox"></input>
      <label className="mt-2">color</label>
      <input name="f2" type="color"></input>
      <label className="mt-2">date</label>
      <input name="f3" type="date"></input>
      <label className="mt-2">datetime-local</label>
      <input name="f4" type="datetime-local"></input>
      <label className="mt-2">email</label>
      <input name="f5" type="email"></input>
      <label className="mt-2">hidden</label>
      <input
        name="secret"
        type="hidden"
        value="f7dd7b48365218b535ead7940ea3b9d294475b73c089e2fb"
      ></input>
      <label className="mt-2">month</label>
      <input name="f7" type="month"></input>
      <label className="mt-2">number</label>
      <input name="f8" type="number"></input>
      <label className="mt-2">password</label>
      <input name="f9" type="password"></input>
      <label className="mt-2">radio</label>
      <input name="f10" type="radio"></input>
      <label className="mt-2">range</label>
      <input name="f11" type="range"></input>
      <label className="mt-2">search</label>
      <input name="f12" type="search"></input>
      <label className="mt-2">tel</label>
      <input name="f13" type="tel"></input>
      <label className="mt-2">text</label>
      <input name="f13" type="text"></input>
      <label className="mt-2">time</label>
      <input name="f13" type="time"></input>
      <label className="mt-2">url</label>
      <input name="f13" type="url"></input>
      <label className="mt-2">week</label>
      <input name="f13" type="week"></input>

      <button type="submit" className="mb-5">
        Submit
      </button>
    </form>
  );
};

export default Demo;
