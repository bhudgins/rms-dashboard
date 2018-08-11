package org.spp;

import com.mongodb.MongoClient;
import de.flapdoodle.embed.mongo.MongoImportExecutable;
import de.flapdoodle.embed.mongo.MongoImportProcess;
import de.flapdoodle.embed.mongo.MongoImportStarter;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.config.IMongoImportConfig;
import de.flapdoodle.embed.mongo.config.MongoImportConfigBuilder;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.net.UnknownHostException;

@SpringBootApplication
public class RmsDashboardApplication {

	public static void main(String[] args) {

		SpringApplication.run(RmsDashboardApplication.class, args);

//		int defaultConfigPort = 52709;
//		String defaultHost = "localhost";
//		String database = "rms_dashboard_db";
//		String collections[] = {"department_statistic", "rms_percentages_total",
//				"rms_request_types_total", "rms_requests_total", "rms_time_to_resolutions_total"};
//		String jsonFile="C:\\Users\\branb\\IdeaProjects\\rms-dashboard\\src\\main\\resources\\data\\";
//		//MongodProcess mongod = startMongod(defaultConfigPort);
//
//		try {
//			for(String collection : collections) {
//				MongoImportProcess mongoImport = startMongoImport(defaultConfigPort, database, collection, jsonFile + collection + ".json", false, true, true);
//			}
//
//		} catch (IOException e){}
	}

//	private static MongoImportProcess startMongoImport(int port, String dbName, String collection, String jsonFile, Boolean jsonArray,Boolean upsert, Boolean drop)
//			throws UnknownHostException, IOException {
//		IMongoImportConfig mongoImportConfig = new MongoImportConfigBuilder()
//				.version(Version.Main.PRODUCTION)
//				.net(new Net(port, Network.localhostIsIPv6()))
//				.db(dbName)
//				.collection(collection)
//				.upsert(upsert)
//				.dropCollection(drop)
//				.jsonArray(jsonArray)
//				.importFile(jsonFile)
//				.build();
//
//		MongoImportExecutable mongoImportExecutable = MongoImportStarter.getDefaultInstance().prepare(mongoImportConfig);
//		MongoImportProcess mongoImport = mongoImportExecutable.start();
//		return mongoImport;
//	}
}
