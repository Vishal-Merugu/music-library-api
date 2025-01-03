# Music Library API

Welcome to the Music Library API! This API allows you to manage a collection of music, including artists, albums, and tracks.

## Features

- Add, update, and delete artists
- Add, update, and delete albums
- Add, update, and delete tracks
- Search for music by artist, album, or track

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/music-library-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd music-library-api
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the API

To start the API server in development mode, run:
```sh
npm run dev
```

To start the API server in production mode, run:
```sh
npm run build && npm run start
```

The API will be available at `http://localhost:3000`.

### Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```
PORT=8000
DATABASE_URL=your_database_host_url
JWT_SECRET=ur_secret
REDIS_HOST=your_redis_url
REDIS_PORT=6379
```

## API Endpoints

### Artists

- `GET /artists` - Get a list of all artists
- `POST /artists` - Add a new artist
- `GET /artists/:id` - Get details of a specific artist
- `PUT /artists/:id` - Update a specific artist
- `DELETE /artists/:id` - Delete a specific artist

### Albums

- `GET /albums` - Get a list of all albums
- `POST /albums` - Add a new album
- `GET /albums/:id` - Get details of a specific album
- `PUT /albums/:id` - Update a specific album
- `DELETE /albums/:id` - Delete a specific album

### Tracks

- `GET /tracks` - Get a list of all tracks
- `POST /tracks` - Add a new track
- `GET /tracks/:id` - Get details of a specific track
- `PUT /tracks/:id` - Update a specific track
- `DELETE /tracks/:id` - Delete a specific track

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.


## Contact

For questions or feedback, please contact [vishalvish360@gmail.com](mailto:vishalvish360@gmail.com).

