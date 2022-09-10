import { useState, useEffect } from "react";

const Api = () => {
  const [datos, setDatos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    capturarDatosApi();
  }, []);

  const capturarDatosApi = async () => {
    const data = await fetch(
      "https://dragon-ball-super-api.herokuapp.com/api/characters"
    );
    const int = await data.json();
    setDatos(
      int.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
    );
  };

  const buscador = (e) => {
    setSearch(e.target.value);
  };
  let results = [];
  if (!search) {
    results = datos;
  } else {
    results = datos.filter((arreglo1) =>
      arreglo1.name.toUpperCase().includes(search.toUpperCase())
    );
  }
  return (
    <div>
      <div class="mt-5 mx-5  flex justify-center border ">
        <div class="mb-3 xl:w-96">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Dragon_Ball_Super.png" alt="" />
          <div class="input-group relative flex items-stretch w-full mb-2 mt-5 mx-1 rounded">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Buscar por nombre"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <span
              class="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
              id="basic-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                class="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <h1 className="font-serif underline text-5xl text-center text-yellow-400 mb-5 mt-3">
        <strong> Personajes</strong>
      </h1>
      
        <div className="flex flex-wrap items-center border ml-5 mr-5 ">
          {results.map((item) => (
            <div
              key={item.id} 
              className=" w-1/2 sm:w-1/3 md:w-1/5 items-center px-2 flex flex-col justify-center"
            >
              <img
                className="mt-5 w-48 h-70 shadow-xl"
                src={item.imageUrl}
                alt="img"
              />
              <img className="" src="https://www.nicepng.com/png/full/954-9546201_nube-nubevoladora-dragonball-kid-goku-iphone-x.png" alt="" />
              <h5 className="mb-1 text-xl text-center font-serif text-yellow-100 dark:text-white">
                {item.name}
              </h5>
              <h5 className="mb-1 text-xl text-center font-serif text-yellow-100 dark:text-white">
                {item.role}
              </h5>
              <h5 className="mb-1 text-xl text-center font-serif text-yellow-100 dark:text-white">
                Universo {item.universe}
              </h5>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Api;
