

drop database eventos;
create database eventos;
use eventos;

CREATE TABLE Departamento (
  idDepartamento INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  Estado BIT default 1,
  PRIMARY KEY (idDepartamento)
);

-- Tabla Carrera
CREATE TABLE Carrera (
  idCarrera INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  idDepartamento INT NOT NULL,
  Estado BIT default 1,
  PRIMARY KEY (idCarrera),
  FOREIGN KEY (idDepartamento) REFERENCES Departamento (idDepartamento)
);

CREATE TABLE Categoria_evento(
idCategoria INT NOT NULL AUTO_INCREMENT,
Nombre VARCHAR(200) NOT NULL,
Estado BIT default 1,
PRIMARY KEY (idCategoria)
);

-- Tabla Evento
CREATE TABLE Evento (
  idEvento INT NOT NULL AUTO_INCREMENT,
  idCategoria INT NOT NULL,
  imagen LONGBLOB NULL,
  Titulo VARCHAR(200) NOT NULL,
  Descripcion TEXT NOT NULL,
  fechainicio DATE NOT NULL,
  FechaFin DATE NOT NULL,
  Estado BIT default 1,
  FOREIGN KEY (idCategoria) REFERENCES Categoria_evento (idCategoria),
  PRIMARY KEY (idEvento)
);

-- Tabla Evento_camera
CREATE TABLE Evento_Carrera (
  idEvento INT NOT NULL,
  idCarrera INT NOT NULL,
  Estado BIT default 1,
  FOREIGN KEY (idEvento) REFERENCES Evento (idEvento),
  FOREIGN KEY (idCarrera) REFERENCES Carrera (idCarrera)
);

-- Tabla Alumno
CREATE TABLE Alumno (
  Carne VARCHAR(20) NOT NULL,
  Nombre VARCHAR(50) NOT NULL,
  direccion TEXT NULL,
  telefono VARCHAR(12) NULL,
  FecNac DATE NULL,
  correo VARCHAR(50) NOT NULL,
  Estado BIT default 1,
  PRIMARY KEY (Carne)
);

CREATE TABLE USUARIO(
CARNE_ALUMNO VARCHAR(20) NOT NULL,
NOMBRE_USUARIO VARCHAR(50) NOT NULL,
CONTRASENA VARCHAR(1000) NOT NULL,
Estado BIT default 1,
IS_ADMIN BIT DEFAULT 0,
 FOREIGN KEY (CARNE_ALUMNO) REFERENCES Alumno (Carne)
);

-- Tabla Agenda
CREATE TABLE Agenda (
  CarneAlumno VARCHAR(20) NOT NULL,
  Titulo VARCHAR(50) NOT NULL,
  Descripcion TEXT NOT NULL,
  Fecha DATE NOT NULL,
  Estado BIT default 1,
  FOREIGN KEY (CarneAlumno) REFERENCES Alumno (Carne)
);
CREATE TABLE CarreraEst (
  Carne VARCHAR(20) NOT NULL,
  idCarrera INT NOT NULL,
  anioIngreso INT NOT NULL,
  Estado BIT default 1,
  PRIMARY KEY (Carne, idCarrera),
  FOREIGN KEY (Carne) REFERENCES Alumno (Carne),
  FOREIGN KEY (idCarrera) REFERENCES Carrera (idCarrera)
);

DELIMITER $$

CREATE PROCEDURE sp_crearDepartamento(IN _Nombre VARCHAR(50))
BEGIN
  INSERT INTO Departamento (Nombre) VALUES (_Nombre);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerDepartamentoPorID(IN _idDepartamento INT)
BEGIN
  SELECT * FROM Departamento WHERE idDepartamento = _idDepartamento AND Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerDepartamentos()
BEGIN
  SELECT * FROM Departamento WHERE Estado = 1;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_actualizarDepartamento(IN _idDepartamento INT, IN _Nombre VARCHAR(50))
BEGIN
  UPDATE Departamento
  SET Nombre = _Nombre
  WHERE idDepartamento = _idDepartamento;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_eliminarDepartamentoLogico(IN _idDepartamento INT)
BEGIN
  UPDATE Departamento SET Estado = 0 WHERE idDepartamento = _idDepartamento;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_crearCarrera(IN _Nombre VARCHAR(50), IN _idDepartamento INT)
BEGIN
  INSERT INTO Carrera (Nombre, idDepartamento) VALUES (_Nombre, _idDepartamento);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerCarreras()
BEGIN
  SELECT Carrera.idCarrera, Carrera.Nombre, Carrera.idDepartamento , Departamento.Nombre as Departamento
  FROM Carrera inner join Departamento on Departamento.idDepartamento = Carrera.idDepartamento
   WHERE Carrera.Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerCarreraPorID(IN _idCarrera INT)
BEGIN
  SELECT * FROM Carrera WHERE idCarrera = _idCarrera AND Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_actualizarCarrera(IN _idCarrera INT, IN _Nombre VARCHAR(50), IN _idDepartamento INT)
BEGIN
  UPDATE Carrera
  SET Nombre = _Nombre, idDepartamento = _idDepartamento
  WHERE idCarrera = _idCarrera;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_eliminarCarreraLogico(IN _idCarrera INT)
BEGIN
  UPDATE Carrera SET Estado = 0 WHERE idCarrera = _idCarrera;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_crearEvento(IN _Titulo VARCHAR(200), IN _Descripcion TEXT, IN _fechainicio DATE, IN _FechaFin DATE, IN id_categoria INT, IN imagen LONGBLOB)
BEGIN
  INSERT INTO Evento (Titulo, Descripcion, fechainicio, FechaFin,idCategoria, imagen) VALUES (_Titulo, _Descripcion, _fechainicio, _FechaFin, id_categoria, imagen);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerEventosActivos()
BEGIN
  SELECT * FROM Evento WHERE Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerEventoActivoPorID(IN _idEvento INT)
BEGIN
  SELECT * FROM Evento WHERE idEvento = _idEvento AND Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_actualizarEvento(IN _idEvento INT, IN _Titulo VARCHAR(200), IN _Descripcion TEXT, IN _fechainicio DATE, IN _FechaFin DATE, IN _id_categoria INT, IN _imagen LONGBLOB)
BEGIN
  UPDATE Evento
  SET Titulo = _Titulo, Descripcion = _Descripcion, fechainicio = _fechainicio, FechaFin = _FechaFin, imagen = _imagen, idCategoria = _id_categoria
  WHERE idEvento = _idEvento;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_eliminarEventoLogico(IN _idEvento INT)
BEGIN
  UPDATE Evento SET Estado = 0 WHERE idEvento = _idEvento;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_crearRelacionEventoCarrera(IN _idEvento INT, IN _idCarrera INT)
BEGIN
  INSERT INTO Evento_Carrera (idEvento, idCarrera) VALUES (_idEvento, _idCarrera);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerRelacionesActivasEventoCarrera()
BEGIN
  SELECT * FROM Evento_Carrera WHERE Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerRelacionesActivasEventoCarreraPorEvento(IN _idEvento INT)
BEGIN
  SELECT * FROM Evento_Carrera WHERE idEvento = _idEvento AND Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_eliminarRelacionEventoCarreraLogico(IN _idEvento INT, IN _idCarrera INT)
BEGIN
  UPDATE Evento_Carrera SET Estado = 0 WHERE idEvento = _idEvento AND idCarrera = _idCarrera;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerRelacionesActivasEventoCarreraPorCarrera(IN _idCarrera INT)
BEGIN
  SELECT * FROM Evento_Carrera WHERE idCarrera = _idCarrera AND Estado = 1;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_borrarRelacionesActivasEventoCarreraPorEvento(IN _idEvento INT)
BEGIN
  UPDATE Evento_Carrera SET Estado = 0 WHERE idEvento = _idEvento;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_crearAlumno(IN _Carne VARCHAR(20), IN _Nombre VARCHAR(50), IN _direccion TEXT, IN _telefono VARCHAR(12), IN _FecNac DATE, IN _correo VARCHAR(50),IN _idCarrera INT,  IN _anioIngreso INT)
BEGIN
  INSERT INTO Alumno (Carne, Nombre, direccion, telefono, FecNac, correo) VALUES (_Carne, _Nombre, _direccion, _telefono, _FecNac, _correo);
  INSERT INTO CarreraEst (Carne, idCarrera, anioIngreso) VALUES (_Carne, _idCarrera, _anioIngreso);
END$$
DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_obtenerAlumnosActivos()
BEGIN
  SELECT Alumno.Carne, Alumno.Nombre, Alumno.direccion, Alumno.telefono, Alumno.FecNac, Alumno.correo, CarreraEst.idCarrera, Carrera.Nombre as nombreCarrera, CarreraEst.anioIngreso
   FROM Alumno left join  CarreraEst on CarreraEst.carne = Alumno.carne inner join Carrera on Carrera.idCarrera = CarreraEst.idCarrera
   WHERE Alumno.Estado = 1;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_obtenerAlumnoActivoPorCarne(IN _Carne VARCHAR(20))
BEGIN
  SELECT * FROM Alumno WHERE Carne = _Carne AND Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_actualizarAlumno(IN _Carne VARCHAR(20), IN _Nombre VARCHAR(50), IN _direccion TEXT, IN _telefono VARCHAR(12), IN _FecNac DATE, IN _correo VARCHAR(50),IN _idCarrera INT,  IN anioIngreso INT)
BEGIN
  UPDATE Alumno
  SET Nombre = _Nombre, direccion = _direccion, telefono = _telefono, FecNac = _FecNac, correo = _correo
  WHERE Carne = _Carne;
  UPDATE CarreraEst set  idCarrera = _idCarrera, anioIngreso =  _anioIngreso;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_eliminarAlumnoLogico(IN _Carne VARCHAR(20))
BEGIN
  UPDATE Alumno SET Estado = 0 WHERE Carne = _Carne;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_crearEntradaAgenda(IN _idEvento INT, IN _Titulo VARCHAR(50), IN _Descripcion TEXT, IN _Fecha DATE)
BEGIN
  INSERT INTO Agenda (idEvento, Titulo, Descripcion, Fecha) VALUES (_idEvento, _Titulo, _Descripcion, _Fecha);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerEntradasActivasAgenda()
BEGIN
  SELECT * FROM Agenda WHERE Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerEntradasActivasAgendaPorEvento(IN _idEvento INT)
BEGIN
  SELECT * FROM Agenda WHERE idEvento = _idEvento AND Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_actualizarEntradaAgenda(IN _idEvento INT, IN _Titulo VARCHAR(50), IN _Descripcion TEXT, IN _Fecha DATE)
BEGIN
  UPDATE Agenda
  SET Titulo = _Titulo, Descripcion = _Descripcion, Fecha = _Fecha
  WHERE idEvento = _idEvento;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_eliminarEntradaAgendaLogico(IN _idEvento INT)
BEGIN
  UPDATE Agenda SET Estado = 0 WHERE idEvento = _idEvento;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_crearRelacionCarreraEst(IN _Carne VARCHAR(20), IN _idCarrera INT, IN _anioIngreso INT)
BEGIN
    DECLARE existencia INT;
    SELECT COUNT(*) INTO existencia FROM CarreraEst WHERE Carne = _Carne AND idCarrera = _idCarrera;
    IF existencia > 0 THEN
        UPDATE CarreraEst SET Estado = 1 WHERE Carne = _Carne AND idCarrera = _idCarrera;
    ELSE
        INSERT INTO CarreraEst (Carne, idCarrera, anioIngreso, Estado) VALUES (_Carne, _idCarrera, _anioIngreso, 1);
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_obtenerRelacionesActivasCarreraEstudiantes()
BEGIN
  SELECT * FROM CarreraEst WHERE Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerRelacionesActivasCarreraEstudiantesPorCarne(IN _Carne VARCHAR(20))
BEGIN
  SELECT * FROM CarreraEst WHERE Carne = _Carne AND Estado = 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerRelacionesActivasCarreraEstudiantesPorCarrea(IN _Carrera VARCHAR(20))
BEGIN
  SELECT * FROM CarreraEst WHERE idCarrera = _Carrera AND Estado = 1;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_actualizarRelacionCarreraEst(IN _Carne VARCHAR(20), IN _idCarrera INT, IN _anioIngreso INT)
BEGIN
  UPDATE CarreraEst
  SET anioIngreso = _anioIngreso
  WHERE Carne = _Carne AND idCarrera = _idCarrera;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_eliminarRelacionCarreraEstLogico(IN _Carne VARCHAR(20))
BEGIN
  UPDATE CarreraEst SET Estado = 0 WHERE Carne = _Carne;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_crearCategoria(IN _Nombre VARCHAR(200))
BEGIN
  INSERT INTO Categoria_evento (Nombre) VALUES (_Nombre);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_obtenerCategorias()
BEGIN
  SELECT * FROM Categoria_evento WHERE Estado = 1;
END$$
DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_actualizarcategoria(IN _idCategoria INT, IN _Nombre VARCHAR(50))
BEGIN
  UPDATE Categoria_evento
  SET Nombre = _Nombre
  WHERE idCategoria = _idCategoria;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_eliminarCategoriaLogico(IN _idCategoria INT)
BEGIN
  UPDATE Categoria_evento SET Estado = 0 WHERE idCategoria = _idCategoria;
END$$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE sp_obtenerUsuarios()
BEGIN
  SELECT 
  USUARIO.CARNE_ALUMNO as Carne, Alumno.Nombre as Nombre, USUARIO.NOMBRE_USUARIO as "Nombre de USUARIO", USUARIO.IS_ADMIN as Admin
  
  FROM USUARIO inner join Alumno 
  on Alumno.carne = USUARIO.CARNE_ALUMNO
  WHERE USUARIO.Estado = 1 and Alumno.estado = 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_crearUsuario(
    IN p_carne_alumno VARCHAR(20),
    IN p_nombre_Usuario VARCHAR(50),
    IN p_contrasena VARCHAR(1000),
    IN p_is_admin BIT
)
BEGIN
    INSERT INTO USUARIO (CARNE_ALUMNO, NOMBRE_USUARIO, CONTRASENA, IS_ADMIN)
    VALUES (p_carne_alumno, p_nombre_Usuario, p_contrasena, p_is_admin);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_inhabilitarUsuario(
    IN p_carne_alumno VARCHAR(20)
)
BEGIN
    UPDATE USUARIO
    SET Estado = 0
    WHERE CARNE_ALUMNO = p_carne_alumno;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_buscarUsuarioPorNombre(
    IN p_nombre_Usuario VARCHAR(50)
)
BEGIN
    SELECT * FROM USUARIO
    WHERE NOMBRE_USUARIO = p_nombre_Usuario;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_buscarUsuarioPorCarne(
    IN p_carne VARCHAR(50)
)
BEGIN
    SELECT * FROM USUARIO
    WHERE CARNE_ALUMNO = p_carne;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_modificarUsuario(
    IN p_carne_alumno VARCHAR(20),
    IN p_nombre_Usuario VARCHAR(50),
    IN p_contrasena VARCHAR(1000),
    IN p_is_admin BIT
)
BEGIN
    UPDATE USUARIO
    SET NOMBRE_USUARIO = p_nombre_Usuario,
        CONTRASENA = p_contrasena,
        IS_ADMIN = p_is_admin
    WHERE CARNE_ALUMNO = p_carne_alumno;
END$$
DELIMITER ;
