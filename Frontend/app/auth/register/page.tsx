"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { SocialIcon } from "react-social-icons"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const institutes = [
  { id: "inst_1", name: "A. D. Patel Institute of Technology" },
  { id: "inst_2", name: "A.K.G. Engineering College" },
  { id: "inst_3", name: "A.R.J. College of Engineering and Technology" },
  { id: "inst_4", name: "ABES Engineering College" },
  { id: "inst_5", name: "ACE Engineering College" },
  { id: "inst_6", name: "AES American Embassy School" },
  { id: "inst_7", name: "AIMIT" },
  { id: "inst_8", name: "AIT" },
  { id: "inst_9", name: "AMC Engineering College" },
  { id: "inst_10", name: "APS College of Engineering" },
  { id: "inst_11", name: "AQJ College" },
  { id: "inst_12", name: "ASM Institute of Business Management and Research" },
  { id: "inst_13", name: "Aalim Muhammed Salegh College" },
  { id: "inst_14", name: "Aarupadai Veedu Institute of Technology" },
  { id: "inst_15", name: "Acharya Institute of Technology" },
  { id: "inst_16", name: "Acharya N.G. Ranga Agricultural University" },
  { id: "inst_17", name: "Acharya Nagarjuna Vishwavidhyalayamu" },
  { id: "inst_18", name: "Acropolis Institute of Technology and Research" },
  { id: "inst_19", name: "Acropolis Technical Campus" },
  { id: "inst_20", name: "Adhiyamaan College of Engineering" },
  { id: "inst_21", name: "Adi Shankara Institute of Engineering and Technology" },
  { id: "inst_22", name: "Adikavi Nannaya University" },
  { id: "inst_23", name: "Aditanar College of Arts and Science" },
  { id: "inst_24", name: "Aditya Institute of Technology and Management" },
  { id: "inst_25", name: "Advanced Institute of Technology and Management" },
  { id: "inst_26", name: "Agra College" },
  { id: "inst_27", name: "Ajmer Institute of Technology" },
  { id: "inst_28", name: "Akkineni Nageswara Rao College" },
  { id: "inst_29", name: "Al-Ameen Educational and Medical Foundation" },
  { id: "inst_30", name: "Alagappa University College of Education" },
  { id: "inst_31", name: "Alard Institute of Management Sciences (AIMS)" },
  { id: "inst_32", name: "Aligarh Muslim University" },
  { id: "inst_33", name: "All India Institute of Medical Sciences" },
  { id: "inst_34", name: "All Saints College of Technology" },
  { id: "inst_35", name: "All Saints College" },
  { id: "inst_36", name: "Allahabad Agricultural Institute" },
  { id: "inst_37", name: "Allahabad University" },
  { id: "inst_38", name: "Allana Inistitute Of Management Sciences" },
  { id: "inst_39", name: "Allana Institute of Management Studies" },
  { id: "inst_40", name: "Alpha College of Engineering" },
  { id: "inst_41", name: "Amal Jyothi College of Engineering" },
  { id: "inst_42", name: "Ambala College of Engineering" },
  { id: "inst_43", name: "Ambedkar Institute of Technology" },
  { id: "inst_44", name: "American School of Bombay" },
  { id: "inst_45", name: "Amity School of Engineering and Technology - New Delhi" },
  { id: "inst_46", name: "Amity University Lucknow Campus" },
  { id: "inst_47", name: "Amity University Haryana" },
  { id: "inst_48", name: "Amrapali Institute of Management and Computer Applications" },
  { id: "inst_49", name: "Amrapali Institute of Technology and Sciences" },
  { id: "inst_50", name: "Amravati University" },
  { id: "inst_51", name: "Amrita Vishwa Vidyapeetham - Coimbatore" },
  { id: "inst_52", name: "Amrita Vishwa Vidyapeetham - Amritapuri" },
  { id: "inst_53", name: "Amrita Vishwa Vidyapeetham - Bangalore" },
  { id: "inst_54", name: "Amrita School of Arts and Sciences - Mysore" },
  { id: "inst_55", name: "Amrita School of Arts and Sciences - Kochi" },
  { id: "inst_56", name: "Amrutvahini College of Engineering" },
  { id: "inst_57", name: "Anand Institute of Higher Technology" },
  { id: "inst_58", name: "Anand Institute of Information Science" },
  { id: "inst_59", name: "Anbanathapuram Vahaira Charities College - A.V.C." },
  { id: "inst_60", name: "Andhra University" },
  { id: "inst_61", name: "Angel College of Engineering and Technology" },
  { id: "inst_62", name: "Anil Neerukonda Institute of Technology and Sciences - ANITS" },
  { id: "inst_63", name: "Anja Polytechnic College" },
  { id: "inst_64", name: "Anjalai Ammal Mahalingam Engineering College" },
  { id: "inst_65", name: "Anjuman College of Engineering and Technology" },
  { id: "inst_66", name: "Anna University" },
  { id: "inst_67", name: "Annai Mathammal Sheela Engineering College" },
  { id: "inst_68", name: "Annai Teresa Magalir Palkalaikazhgam" },
  { id: "inst_69", name: "Annamacharya Institute of Technology and Sciences" },
  { id: "inst_70", name: "Annamalai University" },
  { id: "inst_71", name: "Anurag group of Institutions" },
  { id: "inst_72", name: "Apeejay College of Engineering" },
  { id: "inst_73", name: "Apeejay Institute of Technology" },
  { id: "inst_74", name: "Apex Institute of Management and Science" },
  { id: "inst_75", name: "Appa Institute of Engineering and Technology" },
  { id: "inst_76", name: "Arasu Engineering College" },
  { id: "inst_77", name: "Army Institute of Technology" },
  { id: "inst_78", name: "Arul Anandar College" },
  { id: "inst_79", name: "Arya College of Engineering and Information Technology" },
  { id: "inst_80", name: "Arya Institute of Engineering and Technology" },
  { id: "inst_81", name: "Aryabhatta Institute of Engineering and Management" },
  { id: "inst_82", name: "Asansol Engineering College" },
  { id: "inst_83", name: "Asia Pacific Institute of Information Technology" },
  { id: "inst_84", name: "Assam Agricultural University" },
  { id: "inst_85", name: "Assam Engineering College" },
  { id: "inst_86", name: "Assam University" },
  { id: "inst_87", name: "Atal Birahi Vajpayee Indian Institute of Information Technology and Management" },
  { id: "inst_88", name: "Atharva College of Engineering" },
  { id: "inst_89", name: "Atmiya Institute of Technology and Science" },
  { id: "inst_90", name: "Atria Institute of Technology" },
  { id: "inst_91", name: "Auden Technology and Management Academy" },
  { id: "inst_92", name: "Aurora P. G. College" },
  { id: "inst_93", name: "Aurora Engineering College" },
  { id: "inst_94", name: "Avanthi Institute of Engineering and Technology" },
  { id: "inst_95", name: "Avinashilingam Institute for Home Science and Higher Education for Women" },
  { id: "inst_96", name: "Awadhesh Pratap Singh Vishwavidyalaya" },
  { id: "inst_97", name: "Ayya Nadar Janaki Ammal College" },
  { id: "inst_98", name: "B P Poddar Institute of Management and Technology" },
  { id: "inst_99", name: "B. P. Poddar Institute of Management and Technology" },
  { id: "inst_100", name: "B. V. B. College of Engineering and Technology" },
  { id: "inst_101", name: "B.N. Mandal University" },
  { id: "inst_102", name: "B.S. Anangpuria Institute of Technology and Management" },
  { id: "inst_103", name: "B.V.B. College of Engineering and Technology" },
  { id: "inst_104", name: "B.V.C. Engineering College" },
  { id: "inst_105", name: "BBS College of Engineering and. Technology" },
  { id: "inst_106", name: "BK Birla Institue of Engineering and Technology" },
  { id: "inst_107", name: "BLDEACET" },
  { id: "inst_108", name: "BMS College of Engineering (BMSCE)" },
  { id: "inst_109", name: "BMS Institute of Technology (BMSIT)" },
  { id: "inst_110", name: "BNM Institute of Technology" },
  { id: "inst_111", name: "BSA College of Engineering and Technology" },
  { id: "inst_112", name: "BSA Crescent Engineering College" },
  { id: "inst_113", name: "Baba Banda Singh Bahadur Engineering College" },
  { id: "inst_114", name: "Baba Farid University of Health Sciences" },
  { id: "inst_115", name: "Baba Saheb Ambedkar Institute of Technology and Management" },
  { id: "inst_116", name: "Babaria Institute of Technology" },
  { id: "inst_117", name: "Babasaheb Bhimrao Ambedkar Bihar University" },
  { id: "inst_118", name: "Babasaheb Bhimrao Ambedkar University" },
  { id: "inst_119", name: "Babu Banarasi Das National Institute of Technology and Management" },
  { id: "inst_120", name: "Babu Banarsi Das Institute of Technology" },
  { id: "inst_121", name: "Babu Mohanlal Arya Smarak Engineering College" },
  { id: "inst_122", name: "Bahadhur Shastri National Academy of Administration" },
  { id: "inst_123", name: "Baharati Vidyapeeth College of Engineering" },
  { id: "inst_124", name: "Bahai Institute for Higher Education" },
  { id: "inst_125", name: "Baldev Ram Mirdha Institute of Technology" },
  { id: "inst_126", name: "Balaji Institute of Technology & Science" },
  { id: "inst_127", name: "Banaras Hindu University" },
  { id: "inst_128", name: "Banarsidas Chandiwala Institute Of Information Technology" },
  { id: "inst_129", name: "Banasthali Vidyapith for Women" },
  { id: "inst_130", name: "Bangalore Institute of Technology" },
  { id: "inst_131", name: "Bangalore University" },
  { id: "inst_132", name: "Bankura Unnayani Institute of Engineering" },
  { id: "inst_133", name: "Bannari Amman Institute of Technology" },
  { id: "inst_134", name: "Bansal College of Engineering" },
  { id: "inst_135", name: "Bansal Institute of Science and Technology" },
  { id: "inst_136", name: "Bansal School of Engineering and Technology" },
  { id: "inst_137", name: "Bapuji Institute of Engineering and Technology" },
  { id: "inst_138", name: "Bapuji Institute of Hi-Tech Education" },
  { id: "inst_139", name: "Bapurao Deshmukh College of Engineering" },
  { id: "inst_140", name: "Barkatullah Vishwavidyalaya" },
  { id: "inst_141", name: "Basaveshwar Engineering College - Bagalkot" },
  { id: "inst_142", name: "Beant College of Engineering and Technology" },
  { id: "inst_143", name: "Bellary Engineering College" },
  { id: "inst_144", name: "Bengal College of Engineering and Technology" },
  { id: "inst_145", name: "Bengal Engineering College" },
  { id: "inst_146", name: "Bengal Engineering and Science University" },
  { id: "inst_147", name: "Bengal Institute of Technology" },
  { id: "inst_148", name: "Berhampur University" },
  { id: "inst_149", name: "Bhajarang Engineering College" },
  { id: "inst_150", name: "Bharat Institute of Technology" },
  { id: "inst_151", name: "Bharath Institute of Science and Technology" },
  { id: "inst_152", name: "Bharath Niketan Engineering College" },
  { id: "inst_153", name: "Bharathiar University" },
  { id: "inst_154", name: "Bharathidasan University" },
  { id: "inst_155", name: "Bharati Vidyapeeth" },
  { id: "inst_156", name: "Bharati Vidyapeeth Institute of Management and IT" },
  { id: "inst_157", name: "Bharati Vidyapeeth University Institute of Management and Research" },
  { id: "inst_158", name: "Bharatiya Vidya Bhavans S. P. Jain Institute of Management and Research (SPJIMR)" },
  { id: "inst_159", name: "Bhartiya Pashu-Chikitsa Anusandhan Sansthan" },
  { id: "inst_160", name: "Bhatkhande Music Institute" },
  { id: "inst_161", name: "Bhavnagar University" },
  { id: "inst_162", name: "Bhilai Institute of Technology" },
  { id: "inst_163", name: "Bhiwani Institute of Technology and Sciences" },
  { id: "inst_164", name: "Bhoj Reddy Engineering College for Women" },
  { id: "inst_165", name: "Bhoomaraddi College of Engineering and Technology (BVBCET)" },
  { id: "inst_166", name: "Bhopal Engineering College" },
  { id: "inst_167", name: "Bidhan Chandra Krishi Viswavidyalaya" },
  { id: "inst_168", name: "Bihar Yoga Bharati" },
  { id: "inst_169", name: "Biju Patnaik University of Technology" },
  { id: "inst_170", name: "Birbhum Institute of Engineering and Technology" },
  { id: "inst_171", name: "Birla Institute of Applied Science" },
  { id: "inst_172", name: "Birla Institute of Technology - Ranchi" },
  { id: "inst_173", name: "Birla Institute of Technology and Science - BITS Pilani" },
  { id: "inst_174", name: "Birla Institute of Technology" },
  { id: "inst_175", name: "Birsa Agricultural University" },
  { id: "inst_176", name: "Birsa Institute of Technology" },
  { id: "inst_177", name: "Bishop Heber College" },
  { id: "inst_178", name: "Biyani Institute of Science and Management - BISMA" },
  { id: "inst_179", name: "Brindavan College of Engineering" },
  { id: "inst_180", name: "Bundelkhand Institute of Engineering and Technology" },
  { id: "inst_181", name: "Bundelkhand University" },
  { id: "inst_182", name: "C K Pithawala College of Engineering and Technology" },
  { id: "inst_183", name: "C U Shah College of Engineering and Technology" },
  { id: "inst_184", name: "C.B. Patel Computer College" },
  { id: "inst_185", name: "CET Karnataka Information and Counselling" },
  { id: "inst_186", name: "CIT-Changa" },
  { id: "inst_187", name: "CMR College of Engineering Technology (CMRCET)" },
  { id: "inst_188", name: "CMR College of Engineering and Technology" },
  { id: "inst_189", name: "CMR Institute of Technology" },
  { id: "inst_190", name: "CSI College Of Engineering (CSICE)" },
  { id: "inst_191", name: "CV Raman College of Engineering" },
  { id: "inst_192", name: "CVR College of Engineering" },
  { id: "inst_193", name: "Calcutta Institute of Engineering and Management" },
  { id: "inst_194", name: "Calcutta Institute of Technology" },
  { id: "inst_195", name: "Canara Engineering College" },
  { id: "inst_196", name: "Chandubhai S Patel Institute of Technology" },
  { id: "inst_197", name: "Central Agricultural University" },
  { id: "inst_198", name: "Central Institute of English and Foreign Languages" },
  { id: "inst_199", name: "Central Institute of Fisheries Education" },
  { id: "inst_200", name: "Central Institute of Higher Tibetan Studies" },
  { id: "inst_201", name: "Centre for Development of Advanced Computing" },
  { id: "inst_202", name: "Centre for Environmental Planning and Technology" },
  { id: "inst_203", name: "Chaitanya Bharati Institute of Technology" },
  { id: "inst_204", name: "Chaityana Institute of Science and Technology" },
  { id: "inst_205", name: "Chamelidevi Institute of Technology and Management" },
  { id: "inst_206", name: "Chandigarh Engineering College" },
  { id: "inst_207", name: "Chandra Shekhar Azad University of Agriculture and Technology" },
  { id: "inst_208", name: "Chaudhary Charan Singh Haryana Agricultural University" },
  { id: "inst_209", name: "Chaudhary Charan Singh University" },
  { id: "inst_210", name: "Chaudhary Sarwan Kumar Himachal Pradesh Krishi Vishwavidyalaya" },
  { id: "inst_211", name: "Chennai Mathematical Institute" },
  { id: "inst_212", name: "Cherraans Arts and Science College" },
  { id: "inst_213", name: "Chettinad College of Engineering and Technology" },
  { id: "inst_214", name: "Chhattisgarh Swami Vivekanand Technical University" },
  { id: "inst_215", name: "Chhatrapati Shahu Ji Maharaj University" },
  { id: "inst_216", name: "Chhatrapati Shivaji Institute of Technoloty" },
  { id: "inst_217", name: "Chikhli College" },
  { id: "inst_218", name: "Chinmaya Institute of Technology" },
  { id: "inst_219", name: "Chitkara Educational Trust" },
  { id: "inst_220", name: "Chouksey Engineering College" },
  { id: "inst_221", name: "Christ College" },
  { id: "inst_222", name: "Christ University" },
  { id: "inst_223", name: "Christu Jayanthi Jubilee College" },
  { id: "inst_224", name: "Co-operative Institute of Technology - Vadakara" },
  { id: "inst_225", name: "Cochin University of Science and Technology - Kerala" },
  { id: "inst_226", name: "Coimbatore Institute of Engineering and Technology" },
  { id: "inst_227", name: "Coimbatore Institute of Technology" },
  { id: "inst_228", name: "College of Engineering and Management" },
  { id: "inst_229", name: "College of Engineering and Technology" },
  { id: "inst_230", name: "College of Engineering Kallooppara" },
  { id: "inst_231", name: "College Of Engineering Karunagapally" },
  { id: "inst_232", name: "College of Engineering Poonjar" },
  { id: "inst_233", name: "College of Engineering Roorkee" },
  { id: "inst_234", name: "College of Engineering Thalassery" },
  { id: "inst_235", name: "College of Engineering Trivandrum" },
  { id: "inst_236", name: "College of Engineering" },
  { id: "inst_237", name: "College of Technology And Engineering" },
  { id: "inst_238", name: "Cummins College of Engineering for Women" },
  { id: "inst_239", name: "D. G. Ruparel College" },
  { id: "inst_240", name: "D.G. Vaishnav College - Chennai" },
  { id: "inst_241", name: "D.N.R College" },
  { id: "inst_242", name: "DAV College of Engineering and Technology" },
  { id: "inst_243", name: "DAV Institute of Engineering and Technology" },
  { id: "inst_244", name: "DB Pampa College" },
  { id: "inst_245", name: "DES Navinchandra Mehta Institute of Technology and Development" },
  { id: "inst_246", name: "DMCE Online" },
  { id: "inst_247", name: "DRK Institute of Science and Technology" },
  { id: "inst_248", name: "DVR college of Engineering and Technology" },
  { id: "inst_249", name: "Dadi Institute of Engineering and Technology" },
  { id: "inst_250", name: "Dakshina Bharat Hindi Prachar Sabha" },
  { id: "inst_251", name: "Darda Engineering College Yavatmal" },
  { id: "inst_252", name: "Dayalbagh Educational Institute" },
  { id: "inst_253", name: "Dayananda Sagar Institutions" },
  { id: "inst_254", name: "Deccan College of Engineering and Technology" },
  { id: "inst_255", name: "Deenbandhu Chhotu Ram University of Science and Technology" },
  { id: "inst_256", name: "Deendayal Upadhyay Gorakhpur University" },
  { id: "inst_257", name: "Deepshikha College of Technical Education" },
  { id: "inst_258", name: "Dehradun Institute of Technology" },
  { id: "inst_259", name: "Delhi College of Engineering" },
  { id: "inst_260", name: "Delhi University" },
  { id: "inst_261", name: "Delhi Vishwavidyalaya" },
  { id: "inst_262", name: "Deogiri College Aurangabad" },
  { id: "inst_263", name: "Dev Sanskriti Vishwavidyalaya" },
  { id: "inst_264", name: "Devanga Arts College" },
  { id: "inst_265", name: "Devi Ahilya Vishwavidyalaya" },
  { id: "inst_266", name: "Devineni Venkata Ramana and Dr. HS Mic College of Technology" },
  { id: "inst_267", name: "Dhanalakshmi College of Engineering" },
  { id: "inst_268", name: "Dharmsinh Desai University" },
  { id: "inst_269", name: "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)" },
  { id: "inst_270", name: "Dhruva College of Management" },
  { id: "inst_271", name: "Dibrugarh University" },
  { id: "inst_272", name: "Dnyaneswar Vidyapeeth IST " },
  { id: "inst_273", name: "Doctor B.R. Ambedkar Open University" },
  { id: "inst_274", name: "Doctor Babasaheb Ambedkar Technological University" },
  { id: "inst_275", name: "Doctor Balasaheb Sawant Konkan Krishi Vidyapeeth" },
  { id: "inst_276", name: "Doctor Bhim Rao Ambedkar University" },
  { id: "inst_277", name: "Doctor Harisingh Gour Vishwavidyalaya" },
  { id: "inst_278", name: "Doctor Panjabrao Deshmukh Krishi Vidyapeeth" },
  { id: "inst_279", name: "Doctor Ram Manohar Lohia Awadh University" },
  { id: "inst_280", name: "Doctor Yashwant Singh Parmar University of Horticulture and Forestry" },
  { id: "inst_281", name: "Don Bosco Institute of Technology" },
  { id: "inst_282", name: "Dr G R Damodaran College of Science" },
  { id: "inst_283", name: "Dr MGR College" },
  { id: "inst_284", name: "Dr Mahalingam College of Engineering and Technology" },
  { id: "inst_285", name: "Dr Paul Raj Engineering College" },
  { id: "inst_286", name: "Dr. B.C. Roy Engineering College" },
  { id: "inst_287", name: "Dr. Babasaheb Ambedkar Marathwada University" },
  { id: "inst_288", name: "Dr. D. Y. Patil College of Engineering" },
  { id: "inst_289", name: "Dr. D. Y. Patil Institute Of Management and Research" },
  { id: "inst_290", name: "Dr. Kedar Nath Modi Institute of Engineering and Technology" },
  { id: "inst_291", name: "Dr. M.G.R Engineering College" },
  { id: "inst_292", name: "Dr. Navalar Nedunchezhian College Of Engineering" },
  { id: "inst_293", name: "Dr. Pauls Engineering College" },
  { id: "inst_294", name: "Dr. Ram Manohar Lohia Institute" },
  { id: "inst_295", name: "Dr. Sivanthi Aditanar College of Engineering" },
  { id: "inst_296", name: "Dr. T. Thimmaiah Institute of Technology" },
  { id: "inst_297", name: "Dr.M.G.R University" },
  { id: "inst_298", name: "Dravidian University" },
  { id: "inst_299", name: "Dronacharya College of Engineering" },
  { id: "inst_300", name: "Durgapur Institute of Advanced Technology and Management" },
  { id: "inst_301", name: "ERandDCI Institute of Technology" },
  { id: "inst_302", name: "East Point College of Engineering and Technology" },
  { id: "inst_303", name: "Easwari Engineering College" },
  { id: "inst_304", name: "Einstein College of Engineering" },
  { id: "inst_305", name: "Engineering College Ajmer" },
  { id: "inst_306", name: "Engineering College in Patiala" },
  { id: "inst_307", name: "Engineering College of Kota" },
  { id: "inst_308", name: "Engineering College" },
  { id: "inst_309", name: "Erode Sengunthar Engineering College" },
  { id: "inst_310", name: "Ethiraj College" },
  { id: "inst_311", name: "FET" },
  { id: "inst_312", name: "FORE School of Management" },
  { id: "inst_313", name: "Faculdades Integradas Logatti" },
  { id: "inst_314", name: "Fakir Mohan University" },
  { id: "inst_315", name: "Farah Institute of Computer Science" },
  { id: "inst_316", name: "Federal Institute of Science and Technology" },
  { id: "inst_317", name: "Fergusson College - Pune" },
  { id: "inst_318", name: "Feroz Gandhi Institute of Engineering and Technology" },
  { id: "inst_319", name: "Forest Research Institute" },
  { id: "inst_320", name: "Forte Institute of Technology" },
  { id: "inst_321", name: "Fr. Conceicao Rodrigues College of Engineering" },
  { id: "inst_322", name: "Future Institute of Engineering and Management" },
  { id: "inst_323", name: "Gujarat Forensic Science University" },
  { id: "inst_324", name: "G H Raisoni Institute of Information Technology" },
  { id: "inst_325", name: "G. B. Pant Engineering College - Uttar Pradesh" },
  { id: "inst_326", name: "G. D. Goenka World Institute - Lancaster University" },
  { id: "inst_327", name: "G. Narayanamma Institute of Technology and Science" },
  { id: "inst_328", name: "G. Pulla Reddy Engineering College" },
  { id: "inst_329", name: "G. Pullaiah College of Engineering and Technology" },
  { id: "inst_330", name: "G.H. Patel College of Engineering and Technology" },
  { id: "inst_331", name: "G.V.M. Institute of Technology and Management - GVMITM" },
  { id: "inst_332", name: "GATES Institute of Technology" },
  { id: "inst_333", name: "GLA Institute of Technology and Management" },
  { id: "inst_334", name: "GLS Institute of Computer Technology" },
  { id: "inst_335", name: "GMR Institute of Technology (GMRIT)" },
  { id: "inst_336", name: "Gnanamani College Of Engineering" },
  { id: "inst_337", name: "GS Medical College" },
  { id: "inst_338", name: "GVP College of Engineering" },
  { id: "inst_339", name: "Galgotia Institute of Management and Technology" },
  { id: "inst_340", name: "Galgotias College of Engineering and Technology" },
  { id: "inst_341", name: "Ganadipathy Tulsis Engineering College" },
  { id: "inst_342", name: "Gandhi Institute for Technology" },
  { id: "inst_343", name: "Gandhi Institute of Engineering and Technology (GIET)" },
  { id: "inst_344", name: "Gandhi Institute of Engineering and Technology" },
  { id: "inst_345", name: "Gandhi Institute of Technology and Management" },
  { id: "inst_346", name: "Gandhigram Rural Institute" },
  { id: "inst_347", name: "Ganpat University" },
  { id: "inst_348", name: "Garden City College" },
  { id: "inst_349", name: "Gauhati University" },
  { id: "inst_350", name: "Gauthami Degree College For Women" },
  { id: "inst_351", name: "Gayatri Vidya Parishad College of Engineering" },
  { id: "inst_352", name: "Geeta Institute Of Management And Technology" },
  { id: "inst_353", name: "Geetanjali Institute of Technical Studies" },
  { id: "inst_354", name: "Gitam Institute of Technology and Science" },
  { id: "inst_355", name: "Gitam University" },
  { id: "inst_356", name: "Gitarattan International Business School" },
  { id: "inst_357", name: "Global Academy of Technology" },
  { id: "inst_358", name: "Global Institute of Management and Technology (GIMT)" },
  { id: "inst_359", name: "Global Institute of Technology" },
  { id: "inst_360", name: "Goa Institute of Management" },
  { id: "inst_361", name: "Goa University" },
  { id: "inst_362", name: "Godavari Institute of Engineering and Technology" },
  { id: "inst_363", name: "Gogte Institute of Technology" },
  { id: "inst_364", name: "Gojan School of Business and Technology" },
  { id: "inst_365", name: "Gokaraju Rangaraju Institute of Engineering and Technology" },
  { id: "inst_366", name: "Gokhale Institute of Politics and Economics" },
  { id: "inst_367", name: "Gopal Ramalingam Memorial Engineering College" },
  { id: "inst_368", name: "Government College Of Engineering - Pune" },
  { id: "inst_369", name: "Government College of Arts" },
  { id: "inst_370", name: "Government College of Engineering" },
  { id: "inst_371", name: "Government College of Engineering Auranagabd" },
  { id: "inst_372", name: "Government College of Engineering and Ceramic Technology" },
  { id: "inst_373", name: "Government College of Engineering and Leather Technology" },
  { id: "inst_375", name: "Government Engineering College" },
  { id: "inst_376", name: "Government College of Technology" },
  { id: "inst_377", name: "Government Engineering College Ajmer" },
  { id: "inst_378", name: "Government Polytechnic Institute" },
  { id: "inst_379", name: "Government Polytechnic" },
  { id: "inst_380", name: "Govind Ballabh Pant Krishi Evam Praudyogik Vishwavidyalaya" },
  { id: "inst_381", name: "Govt. Mahila Engineering College" },
  { id: "inst_382", name: "Graphic Era Institute of Technology" },
  { id: "inst_383", name: "Great Lakes Institute of Management" },
  { id: "inst_384", name: "Greater Noida Institute of Technology" },
  { id: "inst_385", name: "Gudlavalleru Engineering College" },
  { id: "inst_386", name: "Gujarat Agricultural University" },
  { id: "inst_387", name: "Gujarat Ayurved University" },
  { id: "inst_388", name: "Gujarat University" },
  { id: "inst_389", name: "Gujarat Vidyapith" },
  { id: "inst_390", name: "Gulbarga University" },
  { id: "inst_391", name: "Gulzar Group Of Institutes" },
  { id: "inst_392", name: "Gurgaon Institute of Technology and Management" },
  { id: "inst_393", name: "Guru Ghasidas University" },
  { id: "inst_394", name: "Guru Gobind Singh College of Engineering and Technology" },
  { id: "inst_395", name: "Guru Gobind Singh Indraprastha University" },
  { id: "inst_396", name: "Guru Jambeshwar University" },
  { id: "inst_397", name: "Guru Nanak Dev University" },
  { id: "inst_398", name: "Guru Nanak Enginerring College" },
  { id: "inst_399", name: "Guru Ramdas Khalsa Institite of Technology" },
  { id: "inst_400", name: "Guru Tegh Bahadur Institute of Technology-GTBIT" },
  { id: "inst_401", name: "Gurukula Kangri Vishwavidyalaya" },
  { id: "inst_402", name: "Gurunanak Institute of Technology" },
  { id: "inst_403", name: "Gyan Ganga Institute of Technology and Sciences" },
  { id: "inst_404", name: "Gyan Vihar School of Engineering and Technology" },
  { id: "inst_405", name: "H.K.R.H. College" },
  { id: "inst_406", name: "HKBK College of Engineering" },
  { id: "inst_407", name: "HMS Institute of Technology" },
  { id: "inst_408", name: "Haldia Insitute of Technology" },
  { id: "inst_409", name: "Harcourt Butler Technological Institute - Kanpur" },
  { id: "inst_410", name: "Hemchandracharya North Gujarat University" },
  { id: "inst_411", name: "Hemwati Nandan Bahuguna Garhwal University" },
  { id: "inst_412", name: "Heritage Institute of Technology" },
  { id: "inst_413", name: "Hi-Point College of Engineering and Technology" },
  { id: "inst_414", name: "Himachal Pradesh University" },
  { id: "inst_415", name: "Hindustan College of Engineering" },
  { id: "inst_416", name: "Hindustan College of Science and Technology" },
  { id: "inst_417", name: "Hitkarini College of Engineering and Technology" },
  { id: "inst_418", name: "Holy Mary Institute of Technology and Science" },
  { id: "inst_419", name: "Hyderabad Central University" },
  { id: "inst_420", name: "IBS Ahmedabad" },
  { id: "inst_421", name: "IBS Hyderabad" },
  { id: "inst_422", name: "ICFAI Business School" },
  { id: "inst_423", name: "ICFAI National College" },
  { id: "inst_424", name: "ICFAI School of Information Technology" },
  { id: "inst_425", name: "ICFAI University" },
  { id: "inst_426", name: "IEC College of Engineering and Technology" },
  { id: "inst_427", name: "IMPS College of Engineering and Technology - IMPSCET" },
  { id: "inst_428", name: "IMS College Of Engineering" },
  { id: "inst_429", name: "INMANTEC Integrated Academy of Management and Technology" },
  { id: "inst_430", name: "Ilahia College of Engineering and Technology" },
  { id: "inst_431", name: "India Business School " },
  { id: "inst_432", name: "Indian Agricultural Research Institute" },
  { id: "inst_433", name: "Indian Association for the Cultivation of Science" },
  { id: "inst_434", name: "Indian Business Academy" },
  { id: "inst_435", name: "Indian Institute of Foreign Trade" },
  { id: "inst_436", name: "Indian Institute of Information Management" },
  { id: "inst_437", name: "Indian Institute of Information Technology" },
  { id: "inst_438", name: "Indian Institute of Information Technology - IIIT Allahabad" },
  { id: "inst_439", name: "Indian Institute of Information Technology - IIIT Bangalore" },
  { id: "inst_440", name: "Indian Institute of Information Technology - IIIT Hyderabad" },
  { id: "inst_441", name: "Indian Institute of Information Technology - IIIT Kolkata" },
  { id: "inst_442", name: "Indian Institute of Information Technology - IIIT Pune" },
  { id: "inst_443", name: "Indian Institute of Information Technology Jabalpur" },
  { id: "inst_444", name: "Indian Institute of Information Technology and Management - Kerala" },
  { id: "inst_445", name: "Indian Institute of Information Technology and Management" },
  { id: "inst_446", name: "Indian Institute of Management" },
  { id: "inst_447", name: "Indian Institute of Rural Management" },
  { id: "inst_448", name: "Indian Institute of Science" },
  { id: "inst_449", name: "Indian Institute of Science and Information Technology" },
  { id: "inst_450", name: "Indian Institute of Science - IISc Bangalore" },
  { id: "inst_451", name: "Indian Institute of Science Education and Research Pune" },
  { id: "inst_452", name: "Indian Institute of Space Science and Technology" },
  { id: "inst_453", name: "Indian Institute of Social Welfare and Business Management" },
  { id: "inst_454", name: "Indian Institute of Technology - IIT Bhubaneswar" },
  { id: "inst_455", name: "Indian Institute of Technology - IIT Bombay" },
  { id: "inst_456", name: "Indian Institute of Technology - IIT Delhi" },
  { id: "inst_457", name: "Indian Institute of Technology - IIT Guwahati" },
  { id: "inst_458", name: "Indian Institute of Technology - IIT Kanpur" },
  { id: "inst_459", name: "Indian Institute of Technology - IIT Kharagpur" },
  { id: "inst_460", name: "Indian Institute of Technology - IIT Madras" },
  { id: "inst_461", name: "Indian Institute of Technology - IIT Powaii" },
  { id: "inst_462", name: "Indian Institute of Technology - IIT Roorkee" },
  { id: "inst_463", name: "Indian Institute of Technology - IIT Patna" },
  { id: "inst_464", name: "Indian Institute of Technology - IIT Ropar" },
  { id: "inst_465", name: "Indian Institute of Technology - IIT Hyderabad" },
  { id: "inst_466", name: "Indian Institute of Technology - IIT Gandhinagar" },
  { id: "inst_467", name: "Indian Institute of Technology - IIT Rajasthan" },
  { id: "inst_468", name: "Indian Institute of Technology - IIT Mandi" },
  { id: "inst_469", name: "Indian Institute of Technology - IIT Indore" },
  { id: "inst_470", name: "Indian Institute of Technology - IIT BHU" },
  { id: "inst_471", name: "Indian School of Business" },
  { id: "inst_472", name: "Indian School of Mines - Dhanbad" },
  { id: "inst_473", name: "Indian Statistical Institute" },
  { id: "inst_474", name: "Indira College of Engineering and Management" },
  { id: "inst_475", name: "Indira Gandhi Institute of Development and Research" },
  { id: "inst_476", name: "Indira Gandhi Institute of Technology" },
  { id: "inst_477", name: "Indira Gandhi Krishi Vishwavidyalaya" },
  { id: "inst_478", name: "Indira Gandhi National Open University" },
  { id: "inst_479", name: "Indira Gandhi Rashtriya Mukta Vishwavidyalaya" },
  { id: "inst_480", name: "Indira Institute of Management" },
  { id: "inst_481", name: "Indraprastha Institute of Information Technology" },
  { id: "inst_482", name: "Indira Kala Sangeet Vishwavidyalaya" },
  { id: "inst_483", name: "Indo Global Engineering" },
  { id: "inst_484", name: "Indore Institute of Science and Technology" },
  { id: "inst_485", name: "Indore Professional Studies Academy" },
  { id: "inst_486", name: "Indur Institute of Engineering and Technology" },
  { id: "inst_487", name: "Infant Jesus College of Engineering" },
  { id: "inst_488", name: "Institute of Informatics and Communication" },
  { id: "inst_489", name: "Institute for Development and Research in Banking Technology" },
  { id: "inst_490", name: "Institute for Electronic Governance" },
  { id: "inst_491", name: "Institute of Advanced Computer and Research" },
  { id: "inst_492", name: "Institute of Advanced Studies in Education" },
  { id: "inst_493", name: "Institute of Aeronautical Engineering" },
  { id: "inst_494", name: "Institute of Armament Technology" },
  { id: "inst_495", name: "Institute of Engineering and Science IPS Academy" },
  { id: "inst_496", name: "Institute of Engineering and Technology" },
  { id: "inst_497", name: "Institute of Foreign Trade and Management" },
  { id: "inst_498", name: "Institute of Industrial and Computer Management and Research A.T.S.S. I.I.C.M.R." },
  { id: "inst_499", name: "Institute of Information Technology and Management" },
  { id: "inst_500", name: "Institute of Management Research and Development" },
  { id: "inst_501", name: "Institute of Management Research" },
  { id: "inst_502", name: "Institute of Management Studies Career Development and Research" },
  { id: "inst_503", name: "Institute of Management Studies Noida" },
  { id: "inst_504", name: "Institute of Management Studies- Ghaziabad" },
  { id: "inst_505", name: "Institute of Management Technology" },
  { id: "inst_506", name: "Institute of Management and Research" },
  { id: "inst_507", name: "Institute of Mathematical Sciences - IMSc Chennai" },
  { id: "inst_509", name: "Institute of Productivity and Management" },
  { id: "inst_510", name: "Institute of Road and Transport Technology" },
  { id: "inst_511", name: "Institute of Rural Management Anand" },
  { id: "inst_512", name: "Institute of Technology and Management" },
  { id: "inst_513", name: "Institute of Technology and Science (ITS)" },
  { id: "inst_514", name: "Institute of Technology and Marine Engineering" },
  { id: "inst_515", name: "Integral University" },
  { id: "inst_516", name: "International Institute for Population Sciences" },
  { id: "inst_517", name: "International Institute for Special Education" },
  { id: "inst_518", name: "International Institute of Information Technology" },
  { id: "inst_519", name: "International Institute of Management Science" },
  { id: "inst_520", name: "International Management Institute" },
  { id: "inst_521", name: "International School Of Informatics and Management" },
  { id: "inst_522", name: "International School of Business and Research" },
  { id: "inst_523", name: "International School of Business and Media" },
  { id: "inst_524", name: "International School of Informatics and Management" },
  { id: "inst_525", name: "International School of Information Management" },
  { id: "inst_526", name: "International School of Management Excellence" },
  { id: "inst_527", name: "Invertis Institute of Engineering and Technology" },
  { id: "inst_528", name: "Ishwarchand Vidya Sagar Institute of Technology and Management" },
  { id: "inst_529", name: "Islamiah Institute of Technology" },
  { id: "inst_530", name: "Islamic University of Science and Technology" },
  { id: "inst_531", name: "J.B. Institute of Engineering and Technology" },
  { id: "inst_532", name: "J.T. Mahajan College of Engineering" },
  { id: "inst_533", name: "Jay Sriram College of Technology" },
  { id: "inst_534", name: "JIS College of Engineering" },
  { id: "inst_535", name: "JM Institute of Technology" },
  { id: "inst_536", name: "JNTU College of Engineering" },
  { id: "inst_537", name: "JSPMs Abacus Institute Of Computer Application" },
  { id: "inst_538", name: "JSS Academy of Technical Education" },
  { id: "inst_539", name: "JSS College for Women" },
  { id: "inst_540", name: "Jabalpur Engineering College" },
  { id: "inst_541", name: "Jadavpur University - Jadavpur University" },
  { id: "inst_542", name: "Jagan Institute of Management Studies" },
  { id: "inst_543", name: "Jagan Nath University" },
  { id: "inst_544", name: "Jagannath Institute for Technology and Management" },
  { id: "inst_545", name: "Jagarlamudi Kuppuswamy Chowdary College" },
  { id: "inst_546", name: "Jai Narain Vyas University" },
  { id: "inst_547", name: "Jai Prakash Vishwavidyalaya" },
  { id: "inst_548", name: "Jain University" },
  { id: "inst_549", name: "Jaipur Engineering College and Research Centre" },
  { id: "inst_550", name: "Jaipur Engineering College" },
  { id: "inst_551", name: "Jaipuria Institute of Management" },
  { id: "inst_552", name: "Jamia Hamdard - Delhi" },
  { id: "inst_553", name: "Jamia Millia Islamia" },
  { id: "inst_554", name: "Jansons School of Business" },
  { id: "inst_555", name: "Jansons Institute of Technology" },
  { id: "inst_556", name: "Jawaharlal Institute of Technology" },
  { id: "inst_557", name: "Jawaharlal Nehru Centre for Advanced Scientific Research" },
  { id: "inst_558", name: "Jawaharlal Nehru Engineering College - JNEC" },
  { id: "inst_559", name: "Jawaharlal Nehru Krishi Vishwavidyalaya" },
  { id: "inst_561", name: "Jawaharlal Nehru Technological University" },
  { id: "inst_562", name: "Jawaharlal Nehru University - JNU Delhi" },
  { id: "inst_563", name: "Jawaharlal Nehru Vishvavidyalaya" },
  { id: "inst_564", name: "Jaya College of Arts and Science" },
  { id: "inst_565", name: "Jaya Engineering College" },
  { id: "inst_566", name: "Jayam College of Engineering and Technology" },
  { id: "inst_567", name: "Jayawant Institute of Computer Applications" },
  { id: "inst_568", name: "Jayawant Shikshan Prasarak Mandal" },
  { id: "inst_569", name: "Jayawantrao Sawant College of Engineering" },
  { id: "inst_570", name: "Jaypee Institute of Information Technology" },
  { id: "inst_571", name: "Jaypee University of Information Technology" },
  { id: "inst_572", name: "Jaypee University of Engineering & Technology" },
  { id: "inst_573", name: "Jehangirabad Institute of Technology" },
  { id: "inst_574", name: "Jeppiaar Engineering College" },
  { id: "inst_575", name: "Jerusalem College of Engineering" },
  { id: "inst_576", name: "Jind Institute of Engineering and Technology" },
  { id: "inst_577", name: "Jiwaji University" },
  { id: "inst_578", name: "Jnana Vikas Institute of Technology" },
  { id: "inst_579", name: "Jodhpur Engineering College and Research Centre" },
  { id: "inst_580", name: "Jodhpur Institute of Engineering and Technology" },
  { id: "inst_581", name: "Jorhat Engineering College" },
  { id: "inst_582", name: "Jyothi Engineering College" },
  { id: "inst_583", name: "Jyothi Nivas College" },
  { id: "inst_584", name: "Jyothishmathi Institute of Technology and Science" },
  { id: "inst_585", name: "K L University" },
  { id: "inst_586", name: "K. J. Somaiya College of Engineering" },
  { id: "inst_587", name: "K. K. Wagh Institute of Engineering Education and Research" },
  { id: "inst_588", name: "K. R. School of Information Technology" },
  { id: "inst_589", name: "K. S. R. College of Technology - Tamilnadu" },
  { id: "inst_590", name: "K.C. College of Engineering" },
  { id: "inst_591", name: "KCG College of Technology" },
  { id: "inst_592", name: "KGiSL Institute of Information Management" },
  { id: "inst_593", name: "KGiSL Institute of Technology" },
  { id: "inst_594", name: "KIIT College of Engineering" },
  { id: "inst_595", name: "KIIT University" },
  { id: "inst_596", name: "KLE Society College of Engineering and Technology" },
  { id: "inst_597", name: "KLN College of Engineering" },
  { id: "inst_598", name: "KLN College of Information Technology - KLNCIT" },
  { id: "inst_599", name: "KS Institute of Technology - KSIT" },
  { id: "inst_600", name: "KSR College of Technology" },
  { id: "inst_601", name: "KSRM College of Engineering" },
  { id: "inst_602", name: "KVM College of Engineering and Information Technology" },
  { id: "inst_603", name: "Kakatiya Institute of Technology and Science" },
  { id: "inst_604", name: "Kakatiya University" },
  { id: "inst_605", name: "Kakinada Institute of Engineering and Technology" },
  { id: "inst_606", name: "Kalasalingam University" },
  { id: "inst_607", name: "Kalikata Viswavidyalaya" },
  { id: "inst_608", name: "Kalinga Institute of Industrial Technology - Bhubaneshwar" },
  { id: "inst_609", name: "Kalyani Government Engineering College" },
  { id: "inst_610", name: "Kamala Institute of Technology and Science" },
  { id: "inst_611", name: "Kamaraj College of Engineering and Technology" },
  { id: "inst_612", name: "Kameshwar Singh Darbhanga Sanskrit University" },
  { id: "inst_613", name: "Kamla Nehru Institute of Technology - KNIT" },
  { id: "inst_614", name: "Kanchi Pallavan Enginnering College" },
  { id: "inst_615", name: "Kandula Sreenivasa Reddy Memorial College Of Engineering" },
  { id: "inst_616", name: "Kannada University" },
  { id: "inst_617", name: "Kannur University" },
  { id: "inst_618", name: "Kanpur Institute of Technology" },
  { id: "inst_619", name: "Karnatak University" },
  { id: "inst_620", name: "Karnataka State Open University" },
  { id: "inst_621", name: "Karpaga Vinayaga College of Engineering and Technology" },
  { id: "inst_622", name: "Karpagam Arts and Science College" },
  { id: "inst_623", name: "Karpagam College of Engineering" },
  { id: "inst_624", name: "Karpagam Institute of Technology" },
  { id: "inst_625", name: "Karpagam University" },
  { id: "inst_626", name: "Karunya University" },
  { id: "inst_627", name: "Kathir College of Engineering - KCE" },
  { id: "inst_628", name: "Kautilya Institute of Technology and Engineering" },
  { id: "inst_629", name: "Kavikulguru Institute of Technology and Science" },
  { id: "inst_630", name: "Kavikulguru Kalidas Sanskrit Vishwavidyalaya" },
  { id: "inst_631", name: "Kedar Nath Ginni Devi Modi Engineering College" },
  { id: "inst_632", name: "Kelkar Education Trust Vinayak Ganesh Vaze College" },
  { id: "inst_633", name: "Kerala University" },
  { id: "inst_634", name: "Kerala Agricultural University" },
  { id: "inst_635", name: "Keshav Mahavidyalaya" },
  { id: "inst_636", name: "Keshav Memorial Institute of Technology" },
  { id: "inst_637", name: "Khadir Mohideen College" },
  { id: "inst_638", name: "Khalsa College for Women" },
  { id: "inst_639", name: "Kings College of Engineering" },
  { id: "inst_640", name: "Kings Engineering College" },
  { id: "inst_641", name: "K.I.T College Of Engineering" },
  { id: "inst_642", name: "Koneru Lakshmaiah College of Engineering" },
  { id: "inst_643", name: "Kongu Arts and Science College" },
  { id: "inst_644", name: "Kongu Engineering College" },
  { id: "inst_645", name: "Kongunadu Arts and Science College" },
  { id: "inst_646", name: "Kota Open University" },
  { id: "inst_647", name: "Koti Womens College" },
  { id: "inst_648", name: "Krishna Engineering College" },
  { id: "inst_649", name: "Krishna Institute of Engineering and Technology" },
  { id: "inst_650", name: "Krishnasamy College of Engineering and Technology" },
  { id: "inst_651", name: "Kristu Jyothi College of Management and Technology" },
  { id: "inst_652", name: "Kumaraguru College of Technology - KCT" },
  { id: "inst_653", name: "Kumaun University" },
  { id: "inst_654", name: "Kurukshetra University - Haryana" },
  { id: "inst_655", name: "Kuvempu University" },
  { id: "inst_656", name: "LBS Institute of Technology for Women" },
  { id: "inst_657", name: "LBS PG College" },
  { id: "inst_658", name: "LD College of Engineering" },
  { id: "inst_659", name: "LDRP Institute of Technology and Research" },
  { id: "inst_660", name: "LJ Institute of Computer Applications - LJMCA" },
  { id: "inst_661", name: "Lady Shriram CC" },
  { id: "inst_662", name: "Lakshmi Narain College of Technology - LNCT" },
  { id: "inst_663", name: "Lakshmibai National Institute of Physical Education" },
  { id: "inst_664", name: "Lal Bahadur Shastri Institute of Management" },
  { id: "inst_665", name: "Lala Lajpat Rai Institute of Engineering and Technology" },
  { id: "inst_666", name: "Lalit Narayan Mithila University" },
  { id: "inst_667", name: "Larsen and Toubro Institute of Technology" },
  { id: "inst_668", name: "Late Bhausaheb Hiray S.S.Trusts College of Architecture" },
  { id: "inst_669", name: "Laxmi Devi Institute of Engineering and Technology" },
  { id: "inst_670", name: "Laxmi Niwas Mittal Institute of Information Technology" },
  { id: "inst_671", name: "Les Filles MVN Institute of Engineering and Technology" },
  { id: "inst_672", name: "Lokamanya Tilak PG College" },
  { id: "inst_673", name: "Lokmanya Tilak College of Engineering" },
  { id: "inst_674", name: "Lovely Professional University" },
  { id: "inst_675", name: "Loyola College - Chennai" },
  { id: "inst_676", name: "Loyola Institute of Business Administration" },
  { id: "inst_677", name: "Ludhiana College of Engineering and Technology - LCET" },
  { id: "inst_678", name: "M. S. Ramaiah Institute of Technology - Bangalore" },
  { id: "inst_679", name: "M.S. Engineering College" },
  { id: "inst_680", name: "MCKV Institute of Engineering" },
  { id: "inst_681", name: "MDS University" },
  { id: "inst_682", name: "MEASI Institute of Information Technology" },
  { id: "inst_683", name: "MES College of Engineering" },
  { id: "inst_684", name: "MES College" },
  { id: "inst_685", name: "MET Institute of Computer Science" },
  { id: "inst_686", name: "MET Institute of Engineering" },
  { id: "inst_687", name: "MET Institute of Management" },
  { id: "inst_688", name: "MGM College of Engineering and Technology" },
  { id: "inst_689", name: "MH Saboo Siddik College of Engineering" },
  { id: "inst_690", name: "MIT College of Engineering" },
  { id: "inst_691", name: "MIT School of Telecom and Management Studies" },
  { id: "inst_692", name: "MITS School of Biotechnology - MSB" },
  { id: "inst_693", name: "MK Institute of Computer Studies" },
  { id: "inst_694", name: "MLR Institute of Technology" },
  { id: "inst_695", name: "MLV Textile and Engineering College" },
  { id: "inst_696", name: "MRD Arts and E E Laher Kosadia Commerce College" },
  { id: "inst_697", name: "MVSR Engineering College" },
  { id: "inst_698", name: "Maamallan Institute of Technology" },
  { id: "inst_699", name: "Madanapalle Institute of Technology and Science" },
  { id: "inst_700", name: "Madha Engineering College" },
  { id: "inst_701", name: "Madhav Institute of Technology and Science" },
  { id: "inst_702", name: "Madhira Institute of Technology and Sciences" },
  { id: "inst_703", name: "Madhya Pradesh Bhoj (Open) University" },
  { id: "inst_704", name: "Madina Engineering College" },
  { id: "inst_705", name: "Madras Institute of Technology" },
  { id: "inst_706", name: "Madurai Kamaraj University" },
  { id: "inst_707", name: "Magadh University" },
  { id: "inst_708", name: "Magnus School of Business" },
  { id: "inst_709", name: "Maha College of Engineering" },
  { id: "inst_710", name: "Mahakal Institute of Technology and Science" },
  { id: "inst_711", name: "Maharaj Vijayaram Gajapath Raj College of Engineering" },
  { id: "inst_712", name: "Maharaja Agrasen Institute of Technology" },
  { id: "inst_713", name: "Maharaja Engineering College" },
  { id: "inst_714", name: "Maharaja Institute of Technology" },
  { id: "inst_715", name: "Maharaja Ranjit Singh College of Professional Sciences - MRS" },
  { id: "inst_716", name: "Maharaja Surajmal Institute of Technology" },
  { id: "inst_717", name: "Maharana Pratap Engineering College" },
  { id: "inst_718", name: "Maharana Pratap University of Agriculture and Technology" },
  { id: "inst_719", name: "Maharashtra Academy of Engineering" },
  { id: "inst_720", name: "Maharashtra Animal and Fishery Sciences University" },
  { id: "inst_721", name: "Maharashtra Institute of Technology (MIT)" },
  { id: "inst_722", name: "Maharashtra University of Health Sciences" },
  { id: "inst_723", name: "Maharishi Arvind Institute of Engineering and Technology" },
  { id: "inst_724", name: "Maharishi Arvind Institute of Science and Management - MAISM" },
  { id: "inst_725", name: "Maharishi Mahesh Yogi Vedic Vishwavidyalaya" },
  { id: "inst_726", name: "Maharshi Dayanand Saraswati University" },
  { id: "inst_727", name: "Maharshi Dayanand University" },
  { id: "inst_728", name: "Mahatma Gandhi Antarrashtriya Hindi Vishwavidyalaya" },
  { id: "inst_729", name: "Mahatma Gandhi Chitrakoot Gramodaya Vishwavidyalaya" },
  { id: "inst_730", name: "Mahatma Gandhi Institute of Technology - MGIT" },
  { id: "inst_731", name: "Mahatma Gandhi Kashi Vidyapeeth" },
  { id: "inst_732", name: "Mahatma Gandhi Memorial Medical College" },
  { id: "inst_733", name: "Mahatma Gandhi University" },
  { id: "inst_734", name: "Mahatma Jyotiba Phule (MJP) Rohilkhand University" },
  { id: "inst_735", name: "Mahatma Phule Krishi Vidyapeeth" },
  { id: "inst_736", name: "Mahaveer Institute of Science and Technology" },
  { id: "inst_737", name: "Mahendra Engineering College" },
  { id: "inst_738", name: "Maheshwara Engineering College" },
  { id: "inst_739", name: "Mailam Engineering College" },
  { id: "inst_740", name: "Makhanlal Chaturvedi Rashtriya Patrakarita Vishwavidhyalaya" },
  { id: "inst_741", name: "Malankara Catholic College" },
  { id: "inst_742", name: "Malaviya National Institute of Technology" },
  { id: "inst_743", name: "Malla Reddy College of Engineering and Technology" },
  { id: "inst_744", name: "Malla Reddy Engineering College" },
  { id: "inst_745", name: "Mallabhum Institute of Technology" },
  { id: "inst_746", name: "Malnad College of Engineering" },
  { id: "inst_747", name: "Malout Institute of Management and Information Technology" },
  { id: "inst_748", name: "Management Development Institute" },
  { id: "inst_749", name: "Management Education and Research Institute" },
  { id: "inst_750", name: "Manav Rachna College of Engineering" },
  { id: "inst_751", name: "Mandsaur Institute of Technology" },
  { id: "inst_752", name: "Mangalmay Institute of Management and Technology" },
  { id: "inst_753", name: "Mangalore University" },
  { id: "inst_754", name: "Mangalore Institiute of Technology and Engineering" },
  { id: "inst_755", name: "Manipal Academy of Higher Education" },
  { id: "inst_756", name: "Manipur University" },
  { id: "inst_757", name: "Manjara Charitable Trust Rajiv Gandhi Institute of Technology" },
  { id: "inst_758", name: "Manonmaniam Sundaranar University" },
  { id: "inst_759", name: "Mar Athanasius College of Engineering" },
  { id: "inst_760", name: "Mar Thoma Institute of Information Technology - MIIT" },
  { id: "inst_761", name: "Marathwada Institute of Technology Bulandshahr" },
  { id: "inst_762", name: "Marathwada Krishi Vidyapeeth" },
  { id: "inst_763", name: "Marathwada Mitra Mandal College of Engineering" },
  { id: "inst_764", name: "Marian Engineering College" },
  { id: "inst_765", name: "Marine Engineering College - MERI" },
  { id: "inst_766", name: "Marudhar Engineering College" },
  { id: "inst_767", name: "Matrusri Institute of Post Graduate Studies" },
  { id: "inst_769", name: "Maulana Azad College" },
  { id: "inst_770", name: "Maulana Azad National Institute of Technology" },
  { id: "inst_771", name: "Maulana Azad National Urdu University" },
  { id: "inst_772", name: "Medicaps Institute of Technology and Management" },
  { id: "inst_773", name: "Meenakshi College for Women" },
  { id: "inst_774", name: "Meenakshi Sundararajan Engineering College" },
  { id: "inst_775", name: "Meerut Institute of Engineering and Technology" },
  { id: "inst_776", name: "Meghnad Saha Institute of Technology" },
  { id: "inst_777", name: "Mepco Schlenk Engineering College" },
  { id: "inst_778", name: "Military College of Telecommunication Engineering" },
  { id: "inst_779", name: "Misrimal Navajee Munoth Jain Engineering College" },
  { id: "inst_780", name: "Mizoram University" },
  { id: "inst_781", name: "Model Institute of Engineering and Technology" },
  { id: "inst_782", name: "Model Engineering College" },
  { id: "inst_783", name: "Modi Institute of Technology" },
  { id: "inst_784", name: "Mody Institute of Technology and Science" },
  { id: "inst_785", name: "Mohamed Sathak A.J. College of Engineering" },
  { id: "inst_786", name: "Mohan Lal Sukhadia University" },
  { id: "inst_787", name: "Mohandas College of Engineering and Technology" },
  { id: "inst_788", name: "Mohanlal Sukhadia University - MLSU" },
  { id: "inst_789", name: "Mona College of Engineering and Technology" },
  { id: "inst_790", name: "Moolji Jaitha College" },
  { id: "inst_791", name: "Mother Teresa Institute of Management" },
  { id: "inst_792", name: "Motilal Nehru National Institute of Technology" },
  { id: "inst_793", name: "Mount Carmel College" },
  { id: "inst_794", name: "Mudra Institute of Communications" },
  { id: "inst_795", name: "Muffakham Jah College of Engineering and Technology" },
  { id: "inst_796", name: "Mugniram Bangur Memorial Engineering College" },
  { id: "inst_797", name: "Mukesh Patel School of Technology Management and Engineering" },
  { id: "inst_798", name: "Mumbai Educational Trust (MET)" },
  { id: "inst_799", name: "Munnar Engineering College" },
  { id: "inst_800", name: "Murshidabad College of Engineering and Technology" },
  { id: "inst_801", name: "Mysore Medical College & Research Institute" },
  { id: "inst_802", name: "NBKR Institute of Science and Technology" },
  { id: "inst_803", name: "NERIST" },
  { id: "inst_804", name: "NLCPAS Navsari" },
  { id: "inst_805", name: "NMAM Institute of Technology" },
  { id: "inst_806", name: "NMKRV College" },
  { id: "inst_807", name: "NRI Institute of Information" },
  { id: "inst_808", name: "NRI Institute of Technology" },
  { id: "inst_809", name: "NTR University of Health Sciences Andhra Pradesh" },
  { id: "inst_810", name: "Nadar Mahajana Sangam S.Vellaichamy Nadar College" },
  { id: "inst_811", name: "Nagaland University" },
  { id: "inst_812", name: "Nagarjuna College of Engineering and Technology" },
  { id: "inst_813", name: "Nagarjuna University" },
  { id: "inst_814", name: "Nagpur University" },
  { id: "inst_815", name: "Nalanda Institute of Engineering and Technology" },
  { id: "inst_816", name: "Nalanda Khula Vishwavidyalaya" },
  { id: "inst_817", name: "Nalla Malla Reddy Engineering College" },
  { id: "inst_818", name: "Nallamuthu Gounder Mahalingam College" },
  { id: "inst_819", name: "Nandha Engineering College - Erode" },
  { id: "inst_820", name: "Narasu Sarathy Institute of Technology" },
  { id: "inststill_821", name: "Narayana Engineering College" },
  { id: "inst_822", name: "Narendra Deva University of Agriculture and Technology" },
  { id: "inst_823", name: "Nargund College of Pharmacy" },
  { id: "inst_824", name: "Narmada College of Computer Application" },
  { id: "inst_825", name: "Narsee Monjee Institute of Management and Higher Studies" },
  { id: "inst_826", name: "Narula Institute of Technology" },
  { id: "inst_827", name: "National Academy of Legal Studies and Research University" },
  { id: "inst_828", name: "National Dairy Research Institute" },
  { id: "inst_829", name: "National Engineering College" },
  { id: "inst_830", name: "National Institute of Construction Management and Research" },
  { id: "inst_831", name: "National Institute of Cooperative Management" },
  { id: "inst_832", name: "National Institute of Design" },
  { id: "inst_833", name: "National Institute of Engineering" },
  { id: "inst_834", name: "National Institute of Engineering (NIE) Mysore" },
  { id: "inst_835", name: "National Institute of Fashion Technology" },
  { id: "inst_836", name: "National Institute of Industrial Engineering" },
  { id: "inst_837", name: "National Institute of Information Technology" },
  { id: "inst_838", name: "National Institute of Mental Health and Neuro Sciences" },
  { id: "inst_839", name: "National Institute of Pharmaceutical Education and Research" },
  { id: "inst_840", name: "National Institute of Science and Technology" },
  { id: "inst_841", name: "National Institute of Technology Calicut (NITC)" },
  { id: "inst_842", name: "National Institute of Technology Durgapur" },
  { id: "inst_843", name: "National Institute of Technology Hamirpur" },
  { id: "inst_844", name: "National Institute of Technology Karnataka" },
  { id: "inst_845", name: "National Institute of Technology Kurukshetra" },
  { id: "inst_846", name: "National Institute of Technology Meghalaya" },
  { id: "inst_847", name: "National Institute of Technology Silchar" },
  { id: "inst_848", name: "National Institute of Technology Warangal" },
  { id: "inst_849", name: "National Institute of Technology Trichy" },
  { id: "inst_850", name: "National Institute of Technology" },
  { id: "inst_851", name: "National Insurance Academy (NIA)" },
  { id: "inst_852", name: "National Law Institute University" },
  { id: "inst_853", name: "National Law School of India University" },
  { id: "inst_854", name: "National Law University" },
  { id: "inst_855", name: "Nehru College of Management" },
  { id: "inst_856", name: "Nelson Marlborough Institute of Technology" },
  { id: "inst_857", name: "Netaji Subhas Institute of Technology - Delhi" },
  { id: "inst_858", name: "Netaji Subhas Open University" },
  { id: "inst_859", name: "Netaji Subhash Engineering College - NSEC" },
  { id: "inst_860", name: "Neville Wadia Institute of Management Studies and Research" },
  { id: "inst_861", name: "New Horizon College of Engineering" },
  { id: "inst_862", name: "Nirma Institute of Technology" },
  { id: "inst_863", name: "Nirma University of Science and Technology" },
  { id: "inst_864", name: "Nishitha College of Engineering and Technology" },
  { id: "inst_865", name: "Nishitha PG College" },
  { id: "inst_866", name: "Nitte Meenakshi Institute of Technology" },
  { id: "inst_867", name: "Nizams Institute of Medical Sciences" },
  { id: "inst_868", name: "Noble Institute of Science and Technology" },
  { id: "inst_869", name: "Noida Institute Of Enginnering And Technology" },
  { id: "inst_870", name: "Noorul Islam College of Engineering" },
  { id: "inst_871", name: "Nootan Sarva Vidyalaya Sanchalit MCA College" },
  { id: "inst_872", name: "North Gujarat University" },
  { id: "inst_873", name: "North Maharashtra University" },
  { id: "inst_874", name: "North Orissa University" },
  { id: "inst_875", name: "Northwood High School" },
  { id: "inst_876", name: "North-Eastern Hill University" },
  { id: "inst_877", name: "Northern India Engineering College" },
  { id: "inst_878", name: "Nova College of Engineering and Technology" },
  { id: "inst_879", name: "N.S.S College of Engineering" },
  { id: "inst_880", name: "O. U. College for Women" },
  { id: "inst_881", name: "Oriental Institute of Science and Technology" },
  { id: "inst_882", name: "Orissa University of Agriculture and Technology" },
  { id: "inst_883", name: "Osmania University" },
  { id: "inst_884", name: "Oxford College of Engineering" },
  { id: "inst_885", name: "Oxford Engineering College" },
  { id: "inst_886", name: "P. A. College of Engineering" },
  { id: "inst_887", name: "Palakkad Institute of Science and Technology" },
  { id: "inst_888", name: "P. E. S. College of Engineering" },
  { id: "inst_889", name: "P. S. R. Engineering College" },
  { id: "inst_890", name: "P. V. P. Siddhartha Engineering College" },
  { id: "inst_891", name: "P.B.R. Visvodaya Institute of Technology and Science" },
  { id: "inst_892", name: "P.C. Jabin Science College" },
  { id: "inst_893", name: "P.E. Society Modern College of Engineering" },
  { id: "inst_894", name: "P.E.S. College Of Engineering" },
  { id: "inst_895", name: "P.G. College" },
  { id: "inst_896", name: "PDM College of Engineering" },
  { id: "inst_897", name: "PRRM Engineering College" },
  { id: "inst_898", name: "PSG College of Arts and Science" },
  { id: "inst_899", name: "PSG College of Technology" },
  { id: "inst_900", name: "PSNA College of Engineering and Technology" },
  { id: "inst_901", name: "Paavai Engineering College" },
  { id: "inst_902", name: "Pachaiyappas College" },
  { id: "inst_903", name: "Dr. D. Y. Patil Institute of Master of Computer Applications" },
  { id: "inst_904", name: "Dr D. Y. Patil Vidyapeeth" },
  { id: "inst_905", name: "BVRIT" },
  { id: "inst_906", name: "Padre Conceicao College of Engineering" },
  { id: "inst_907", name: "Pailan College of Management and Technology" },
  { id: "inst_908", name: "Pandit Ravishankar Shukla University" },
  { id: "inst_909", name: "Pandian Saraswathi yadava Engineering College" },
  { id: "inst_910", name: "Panimalar Engineering College" },
  { id: "inst_911", name: "Panipat Institute of Textile and Engineering" },
  { id: "inst_912", name: "Panjab University" },
  { id: "inst_913", name: "Park College of Engineering and Technology" },
  { id: "inst_914", name: "Parul Institute of Engineering and Technology" },
  { id: "inst_915", name: "Patel College Of Science and Technology" },
  { id: "inst_916", name: "Patna University" },
  { id: "inst_917", name: "Peoples Education Society Institute of Technology - PESIT" },
  { id: "inst_918", name: "Peoples Educational Soceity School of Engineering" },
  { id: "inst_919", name: "Periyar Maniammai College of Technology for Women" },
  { id: "inst_920", name: "Periyar University" },
  { id: "inst_921", name: "Pimpri Chichwad Polytechnic" },
  { id: "inst_922", name: "Pimpri Chinchwad College of Engineering" },
  { id: "inst_923", name: "Poddard International College" },
  { id: "inst_924", name: "Pondicherry Engineering College" },
  { id: "inst_925", name: "Pondicherry University" },
  { id: "inst_926", name: "Ponjesly College of Engineering" },
  { id: "inst_927", name: "Poona College" },
  { id: "inst_928", name: "Poornima College of Engineering" },
  { id: "inst_929", name: "Poornima Institute of Engineering and Technology" },
  { id: "inst_930", name: "Postgraduate Institute of Medical Education and Research" },
  { id: "inst_931", name: "Potti Sreeramulu Telugu University" },
  { id: "inst_932", name: "Pragati Engineering College" },
  { id: "inst_933", name: "Prakasam Engineering College" },
  { id: "inst_934", name: "Pranveer Singh Institute of Technology" },
  { id: "inst_935", name: "Prestige Institute of Management Dewas" },
  { id: "inst_936", name: "Priyadarshini College of Engineering" },
  { id: "inst_937", name: "Pune Institute of Computer Technology" },
  { id: "inst_938", name: "Pune Vidhyarthi Grihas College of Engineering and Technology" },
  { id: "inst_939", name: "Punjab Agricultural University" },
  { id: "inst_940", name: "Punjab College of Engineering and Technology" },
  { id: "inst_941", name: "Punjab Engineering College" },
  { id: "inst_942", name: "Punjab Technical University" },
  { id: "inst_943", name: "Punjab University - Chandigarh" },
  { id: "inst_944", name: "Punjabi University Neighbourhood Campus" },
  { id: "inst_945", name: "Punjabi University Patiala" },
  { id: "inst_946", name: "Pydah Engineering College" },
  { id: "inst_947", name: "QIS College of Engineering and Technology" },
  { id: "inst_948", name: "R. C. Patel Institute of Technology" },
  { id: "inst_949", name: "R. D. Gardi Medical College" },
  { id: "inst_950", name: "R. M. K. Engineering College" },
  { id: "inst_951", name: "R. N. S. Institute of Technology" },
  { id: "inst_952", name: "R. V. College of Engineering - Bangalore" },
  { id: "inst_953", name: "R. V. S. College of Arts and Science" },
  { id: "inst_954", name: "R. V. S. College of Engineering and Technology" },
  { id: "inst_955", name: "R.P.Sharma Institute of Technology" },
  { id: "inst_956", name: "RCC Institute of Information Technology" },
  { id: "inst_957", name: "RL Jalappa Institute of Technology" },
  { id: "inst_958", name: "RMD Engineering College" },
  { id: "inst_959", name: "RV College of Engineering" },
  { id: "inst_960", name: "RVR and JC College Of Engineering" },
  { id: "inst_961", name: "Rabindra Bharati University" },
  { id: "inst_962", name: "Radha Govind Engineering College" },
  { id: "inst_963", name: "Raghu Engineering College" },
  { id: "inst_964", name: "Raipur Institute Of Tecnology" },
  { id: "inst_965", name: "Raja College of Engineering" },
  { id: "inst_966", name: "Raja Mahendra College of Engineering" },
  { id: "inst_967", name: "Rajagiri School of Engineering and Technology" },
  { id: "inst_968", name: "Rajalakshmi Engineering College" },
  { id: "inst_969", name: "Rajarambapu Institute of Technology" },
  { id: "inst_970", name: "Rajarshi Shahu College Of Engineering - RSCOE" },
  { id: "inst_971", name: "Rajasthan Agricultural University" },
  { id: "inst_972", name: "Rajasthan College of Engineering For Women" },
  { id: "inst_973", name: "Rajasthan Institute Of Engineering and Technology" },
  { id: "inst_974", name: "Rajasthan Sanskrit Vishwavidyalaya" },
  { id: "inst_975", name: "Rajasthan Vidyapeeth" },
  { id: "inst_976", name: "Rajeev Gandhi Memorial College Of Engineering and Technology" },
  { id: "inst_977", name: "Rajeev Gandhi Institute of Technology" },
  { id: "inst_978", name: "Rajeev Gandhi Technical University" },
  { id: "inst_979", name: "Rajendra Agricultural University" },
  { id: "inst_980", name: "Rajiv Academy For Technology And Management" },
  { id: "inst_981", name: "Rajiv Gandhi Institute of Technology" },
  { id: "inst_982", name: "Rajiv Gandhi Proudyogiki Vishwavidyalaya" },
  { id: "inst_983", name: "Rajiv Gandhi University of Health Sciences" },
  { id: "inst_984", name: "Rajiv Gandhi University of Knowledge Technologies" },
  { id: "inst_985", name: "Rajlalakshmi Engineering College" },
  { id: "inst_986", name: "Ramnarain Ruia College for Arts and Science" },
  { id: "inst_987", name: "Ramrao Adik Institute of Technology - Navi Mumbai" },
  { id: "inst_988", name: "Ranchi University" },
  { id: "inst_989", name: "Ranganathan Engineering College" },
  { id: "inst_990", name: "Rani Durgavati Vishwavidyalaya" },
  { id: "inst_991", name: "Rashtriya Sanskrit Vidyapeetha" },
  { id: "inst_992", name: "Rashtriya Vidyalaya College of Engineering - RVCE" },
  { id: "inst_993", name: "Rayat Institute of Engineering and Information Technology" },
  { id: "inst_994", name: "Rayat and Bahra Institute of Engineering and Bio-Technology" },
  { id: "inst_995", name: "Regency Institute of Technology" },
  { id: "inst_996", name: "Regional Engineering College" },
  { id: "inst_997", name: "Reva Institute of Technology and Management" },
  { id: "inst_998", name: "Rishiraj Institute of Technology" },
  { id: "inst_999", name: "Rizvi College Of Arts" },
  { id: "inst_1000", name: "Roland Institute of Technology" },
  { id: "inst_1001", name: "Royal School of Management and Technology" },
  { id: "inst_1002", name: "Rukmani Devi Institute of Advanced Studies - RDIAS" },
  { id: "inst_1003", name: "Rungta College of Engineering and Technology" },
  { id: "inst_1004", name: "Rural Engineering College" },
  { id: "inst_1005", name: "Rustamji Institute of Technology - RJIT" },
  { id: "inst_1006", name: "S V Institute of Computer Studies" },
  { id: "inst_1007", name: "S. K. Patel Institute of Management and Computer Studies" },
  { id: "inst_1008", name: "S.R.M.S. College of Engineering and Technology - Bareilly" },
  { id: "inst_1009", name: "S. Sukhjinder Singh Engineering and Technology College" },
  { id: "inst_1010", name: "S.D. Sabha Institute Of Technology" },
  { id: "inst_1011", name: "S.I.E.S. College of Management Studies (SIESCOMS)" },
  { id: "inst_1012", name: "S.K.R. Engineering College" },
  { id: "inst_1013", name: "S.P. Chowgule College" },
  { id: "inst_1014", name: "S.R. Engineering College" },
  { id: "inst_1015", name: "S.V.H. College of Engineering" },
  { id: "inst_1016", name: "S.V.K.P And Dr K.S. Raju Arts And Science College" },
  { id: "inst_1017", name: "S.V.P.M College Of Engineering Malegaon (Bk)" },
  { id: "inst_1018", name: "SACS MAVMM Engineering College" },
  { id: "inst_1019", name: "SASTRA University" },
  { id: "inst_1020", name: "SCSVMV" },
  { id: "inst_1021", name: "SCT Institute of Technology" },
  { id: "inst_1022", name: "SD College" },
  { id: "inst_1023", name: "SDM College of Engineering and Technology" },
  { id: "inst_1024", name: "SDP College for Women" },
  { id: "inst_1025", name: "SGGS College of Engineering and Technology" },
  { id: "inst_1026", name: "SHM Engineering College" },
  { id: "inst_1027", name: "Shobhit University Meerut" },
  { id: "inst_1028", name: "SIBER College" },
  { id: "inst_1029", name: "SJM Institute of Technology" },
  { id: "inst_1030", name: "SLBS Engineering College" },
  { id: "inst_1031", name: "SLC Institute of Engineering and Technology" },
  { id: "inst_1032", name: "SN Kansagra School" },
  { id: "inst_1033", name: "SNS College of Engineering" },
  { id: "inst_1034", name: "SP Jain Institute of Management and Research" },
  { id: "inst_1035", name: "SR Engineering College" },
  { id: "inst_1036", name: "SRK Institute of Technology" },
  { id: "inst_1037", name: "SRM Engineering College" },
  { id: "inst_1038", name: "SRM University" },
  { id: "inst_1039", name: "SS Institute of Technology - Hyderabad" },
  { id: "inst_1040", name: "SS Jain Subodh College" },
  { id: "inst_1041", name: "SSJ Engineering College - Sri Sai Jyothi Engineering College" },
  { id: "inst_1042", name: "SSM College of Engineering" },
  { id: "inst_1043", name: "SSN College of Engineering" },
  { id: "inst_1044", name: "ST. Peters Engineering College" },
  { id: "inst_1045", name: "St. Thomas College Of Engineering & Technology" },
  { id: "inst_1046", name: "STJ Institute of Technology" },
  { id: "inst_1047", name: "SUS College of Engineering and Technology" },
  { id: "inst_1048", name: "SVKP and Dr. Kalidindi Suryanarayana Raju Arts and Science College" },
  { id: "inst_1049", name: "Sagi Ramakrishnam Raju Engineering College - SRKR" },
  { id: "inst_1050", name: "Sahrdaya College of Engineering and Technology" },
  { id: "inst_1051", name: "Sai-Sudhir Post Graduate College" },
  { id: "inst_1052", name: "Sakthi Mariamman Engineering College - SMEC" },
  { id: "inst_1053", name: "Sambalpur University" },
  { id: "inst_1054", name: "Sambhram Institute of Technology" },
  { id: "inst_1055", name: "Sampurnanand Sanskrit Vishwavidyalaya" },
  { id: "inst_1056", name: "Samrat Ashok Technological Institute Vidisha - SATI" },
  { id: "inst_1057", name: "Sanjay Gandhi Memorial Government Polytechnic" },
  { id: "inst_1058", name: "Sanjay Gandhi Postgraduate lnstitute of Medical Sciences" },
  { id: "inst_1059", name: "Sankalchand Patel College of Engineering" },
  { id: "inst_1060", name: "Sankara College" },
  { id: "inst_1061", name: "Sanketika Vidya Parishad Engineering College" },
  { id: "inst_1062", name: "Sant Gadge Baba Amravati University" },
  { id: "inst_1063", name: "Sant Longowal Institiute of Engineering and Technology" },
  { id: "inst_1064", name: "Sapthagiri College of Engineering" },
  { id: "inst_1065", name: "Saranathan College of Engineering" },
  { id: "inst_1066", name: "Sardar Patel College of Engineering - Mumbai" },
  { id: "inst_1067", name: "Sardar Patel Institute of Technology - Mumbai" },
  { id: "inst_1068", name: "Sardar Patel University" },
  { id: "inst_1069", name: "Sardar Vallabhbai Polytechnic College" },
  { id: "inst_1070", name: "Sardar Vallabhbhai National Institute of Technology" },
  { id: "inst_1071", name: "Saroj Mohan Institute of Technology" },
  { id: "inst_1072", name: "Sarva Vidhyalaya Institute of Computer Studies" },
  { id: "inst_1073", name: "Sarvajanik College of Engineering" },
  { id: "inst_1074", name: "Sasi Institute of Technology and Engineering" },
  { id: "inst_1075", name: "Sathyabama Engineering College - Chennai" },
  { id: "inst_1076", name: "Sathyabama Institute of Science and Technology" },
  { id: "inst_1077", name: "Sathyabama University" },
  { id: "inst_1078", name: "Satpriya Institute of Engineering and Technology" },
  { id: "inst_1079", name: "Saurashtra University" },
  { id: "inst_1080", name: "Saveetha Engineering College" },
  { id: "inst_1081", name: "School of Planning and Architecture" },
  { id: "inst_1082", name: "Scient Institute of Technology" },
  { id: "inst_1083", name: "Seacom Engineering College" },
  { id: "inst_1084", name: "Seth Rajiv Govind Sable Institute Of Technology" },
  { id: "inst_1085", name: "Sethu Institute of Technology" },
  { id: "inst_1086", name: "Shadan College of Engineering and Technology" },
  { id: "inst_1087", name: "Shadan Womens College of Engineering and Technology" },
  { id: "inst_1088", name: "Shankara Institute of Technology" },
  { id: "inst_1089", name: "Shanmuganathan Engineering College" },
  { id: "inst_1090", name: "Shanmugha Arts" },
  { id: "inst_1091", name: "Shanmugha College of Engineering - Tamilnadu" },
  { id: "inst_1092", name: "Shantilal Shah Engineering College" },
  { id: "inst_1093", name: "Sharda University" },
  { id: "inst_1094", name: "Shekhawati Engineering College" },
  { id: "inst_1095", name: "Shivaji University" },
  { id: "inst_1096", name: "Shree Rayeshwar Institute of Engineering and IT" },
  { id: "inst_1097", name: "Shree Sant Muktabai Institute of Technology - SMIT" },
  { id: "inst_1098", name: "Shreemati Nathibai Damodar Thackersey Womens University" },
  { id: "inst_1099", name: "Shri Andal Alagar College of Engineering" },
  { id: "inst_1100", name: "Shri Balaji College of Engineering and Technology" },
  { id: "inst_1101", name: "Shri Govindram Seksaria Institute of Technology and Science" },
  { id: "inst_1102", name: "Shri Guru Gobind Singhji College of Engineering and Technology" },
  { id: "inst_1103", name: "Shri Guru Ram Rai Institute of Technology and Science" },
  { id: "inst_1104", name: "Shri Hanuman Vyayam Prasarak Mandals College of Engg and Tech" },
  { id: "inst_1105", name: "Shri Jagannath Sanskrit Vishwavidyalaya" },
  { id: "inst_1106", name: "Shri Lal Bahadur Shastri Rashtriya Sanskrit Vidyapeeth" },
  { id: "inst_1107", name: "Shri Mata Vaishno Devi University" },
  { id: "inst_1108", name: "Shri Ram Murti Smarak College of Engineering" },
  { id: "inst_1109", name: "Shri Ramdeobaba Kamla Nehru College" },
  { id: "inst_1110", name: "Shri Ramswaroop Memorial College of Engineering and Management" },
  { id: "inst_1111", name: "Shri Sant Gajanan Maharaja College of Engineering - SSGM" },
  { id: "inst_1112", name: "Shri Vaishnav Institute of Technology and Science" },
  { id: "inst_1113", name: "Shri Venkteshwar Institute Of Technology" },
  { id: "inst_1114", name: "Shri Vishnu Engineering College for Women" },
  { id: "inst_1115", name: "Shrimad Rajchandra Institute of Management and Computer Application" },
  { id: "inst_1116", name: "Shrinathji Institute of Technology and Engineering" },
  { id: "inst_1117", name: "Siddaganga Institute of Technology" },
  { id: "inst_1118", name: "Siddharth Institute of Engineering and Technology - SIETK" },
  { id: "inst_1119", name: "Siddhu Kanhu Murmu University" },
  { id: "inst_1120", name: "Sikkim Manipal University of Health" },
  { id: "inst_1121", name: "Sinhgad Academy of Engineering" },
  { id: "inst_1122", name: "Sinhgad College of Engineering - SCOE" },
  { id: "inst_1123", name: "Sinhgad Institute of Management and Computer Application" },
  { id: "inst_1124", name: "Sinhgad Institute of Technology" },
  { id: "inst_1125", name: "Sinhgad Technical Educational Society - Pune" },
  { id: "inst_1126", name: "Sinhudurg Shikshan Prasarak Mandals College of Engineering" },
  { id: "inst_1127", name: "Sipnas College of Engineering and Technology" },
  { id: "inst_1128", name: "Sir C R Reddy College of Engineering" },
  { id: "inst_1129", name: "Sir M. Visvesvaraya Institute of Technology" },
  { id: "inst_1130", name: "Sir Padampat Singhania University" },
  { id: "inst_1131", name: "Sir Visvesvaraya Memorial Engineering College" },
  { id: "inst_1132", name: "Smt Kashibai Navale College Of Engineering" },
  { id: "inst_1133", name: "Smt Kasturbai Walchand College" },
  { id: "inst_1134", name: "Smt Parvatibai Chowgule College" },
  { id: "inst_1135", name: "Kamala and Venkappa M. Agadi College of Engineering and Technology" },
  { id: "inst_1136", name: "SNDT Women's University" },
  { id: "inst_1137", name: "Sobhasaria Engineering College" },
  { id: "inst_1138", name: "Sona College of Technology" },
  { id: "inst_1139", name: "Sophia Girls College Ajmer" },
  { id: "inst_1140", name: "Sourashtra College" },
  { id: "inst_1141", name: "South Gujarat University - Surat" },
  { id: "inst_1142", name: "South Travancore Hindu College" },
  { id: "inst_1143", name: "Sphoorthy Engineering College" },
  { id: "inst_1144", name: "Sree Chaitanya College of Engineering" },
  { id: "inst_1145", name: "Sree Chitra Tirunal Institute for Medical Sciences and Technology" },
  { id: "inst_1146", name: "Sree Dattha Institute of Engineering" },
  { id: "inst_1147", name: "Sree Narayana Guru Institute of Science and Technology" },
  { id: "inst_1148", name: "Sree Sankaracharya University of Sanskrit" },
  { id: "inst_1149", name: "Sree Sastha Engineering College" },
  { id: "inst_1150", name: "Sreenidhi Institute of Science and Technology" },
  { id: "inst_1151", name: "Sreenivasa Institute of Technology and Management Studies" },
  { id: "inst_1152", name: "Sri Balaji College of Engineering and Technology" },
  { id: "inst_1153", name: "Sri Chandrasekharendra Saraswathi Viswa Mahavidyalaya" },
  { id: "inst_1154", name: "Sri Datta College of Engineering and Science - SDITS" },
  { id: "inst_1155", name: "Sri Devi Womens Engineering College" },
  { id: "inst_1156", name: "Sri Indu College of Engineering and Technology" },
  { id: "inst_1157", name: "Sri Jagadguru Balagangadaranath swamiji Institute of Technology" },
  { id: "inst_1158", name: "Sri Jagadguru Chandrasekaranathaswamiji Institute of Technology" },
  { id: "inst_1159", name: "Sri Jayachamarajendra College of Engineering" },
  { id: "inst_1160", name: "Sri Kaliswari College" },
  { id: "inst_1161", name: "Sri Krishna College of Engineering and Technology (SKCET)" },
  { id: "inst_1162", name: "Sri Krishnadevaraya University" },
  { id: "inst_1163", name: "Sri Manakula Vinayagar Engineering College" },
  { id: "inst_1164", name: "Sri Muthukumaran Institute of Technology" },
  { id: "inst_1165", name: "Sri Padmavati Mahila Viswavidyalayam" },
  { id: "inst_1166", name: "Sri Prakash College of Engineering Tuni" },
  { id: "inst_1167", name: "Sri Ramachandra Medical College and Research Institute" },
  { id: "inst_1168", name: "Sri Ramakrishna Engineering College" },
  { id: "inst_1169", name: "Sri Ramakrishna Mission Vidyalaya College of Arts and Science" },
  { id: "inst_1170", name: "Sri Ramanujar Engineering College" },
  { id: "inst_1171", name: "Sri Sarathi Institute of Engineering and Technology" },
  { id: "inst_1172", name: "Sri Sathya Sai Institute of Higher Learning" },
  { id: "inst_1173", name: "Sri Shakthi Institute of Engineering and Technology" },
  { id: "inst_1174", name: "Sri Siddhartha Institute of Technology" },
  { id: "inst_1175", name: "Sri Sivasubramaniya Nadar College of Engineering" },
  { id: "inst_1176", name: "Sri Vasavi Engineering College" },
  { id: "inst_1177", name: "Sri Venkatesa Perumal College of Engineering and Technology" },
  { id: "inst_1178", name: "Sri Venkateswara College of Engineering" },
  { id: "inst_1179", name: "Sri Venkateswara University" },
  { id: "inst_1180", name: "Sri Vidyaniketan Engineering College" },
  { id: "inst_1181", name: "Srikalahasteeswara Institute of Technology" },
  { id: "inst_1182", name: "Srimad Andavan Arts and Science College" },
  { id: "inst_1183", name: "Srinivas Institute of Technology-Mangalore" },
  { id: "inst_1184", name: "Srinivasa Institute of Engineering and Technology" },
  { id: "inst_1185", name: "Srinivasan Engineering College" },
  { id: "inst_1186", name: "Sriram Engineering College" },
  { id: "inst_1187", name: "St Anns College of Engineering" },
  { id: "inst_1188", name: "St Josephs College of Engineering" },
  { id: "inst_1189", name: "St Patricks PG College" },
  { id: "inst_1190", name: "St Stephen" },
  { id: "inst_1191", name: "St. Francis Institute of Technology" },
  { id: "inst_1192", name: "St. Johns College of Engineering and Techonology" },
  { id: "inst_1193", name: "St. Josephs College (Autonomous) - Tiruchirappalli" },
  { id: "inst_1194", name: "St. Margaret Engineering College - Neemrana" },
  { id: "inst_1195", name: "St. Martins Engineering College" },
  { id: "inst_1196", name: "St. Marys Engineering College" },
  { id: "inst_1197", name: "St. Theressa Institute of Engineering and Technology" },
  { id: "inst_1198", name: "St. Vincent Pallotti College" },
  { id: "inst_1199", name: "St. Xaviers College" },
  { id: "inst_1200", name: "St.Xaviers Catholic College of Engineering" },
  { id: "inst_1201", name: "SAINTGITS COLLEGE OF ENGINEERING" },
  { id: "inst_1202", name: "Stani Memorial College of Engineering and Technology" },
  { id: "inst_1203", name: "Sudharsan Engineering College" },
  { id: "inst_1204", name: "Sushila Devi Bansal College of Technology" },
  { id: "inst_1205", name: "Swami Keshvanand Institute of Technology" },
  { id: "inst_1206", name: "Swami Parmanand College of Engineering and Technology" },
  { id: "inst_1207", name: "Swami Ramanand Teerth Marathwada University" },
  { id: "inst_1208", name: "Swami Ramananda Tirtha Institute of Science and Technology" },
  { id: "inst_1209", name: "Swami Sachchidanand Polytechnic College Visnagar" },
  { id: "inst_1210", name: "Swami Sahajanand College of Commerce And Management" },
  { id: "inst_1211", name: "Swami Vivekananda PG College" },
  { id: "inst_1212", name: "Swarnandhra College of Engineering" },
  { id: "inst_1213", name: "Symbiosis" },
  { id: "inst_1214", name: "T.K.M. College of Engineering" },
  { id: "inst_1215", name: "TERI School of Advanced Studies" },
  { id: "inst_1216", name: "TRR College of Engineering" },
  { id: "inst_1217", name: "Techno India Salt Lake" },
  { id: "inst_1218", name: "TRUBA Institute of Engineering and Information Technology" },
  { id: "inst_1219", name: "Tagore Engineering College" },
  { id: "inst_1220", name: "Tamil Nadu Agricultural University" },
  { id: "inst_1221", name: "Tamil Nadu Doctor Ambedkar Law University" },
  { id: "inst_1222", name: "Tamil Nadu Doctor M.G.R. Medical University" },
  { id: "inst_1223", name: "Tamil Nadu Veterinary and Animal Sciences University" },
  { id: "inst_1224", name: "Tamil University" },
  { id: "inst_1225", name: "Tamilnadu College of Engineering" },
  { id: "inst_1226", name: "Tata Institute of Fundamental Research - TIFR Mumbai" },
  { id: "inst_1227", name: "Tata Institute of Social Sciences" },
  { id: "inst_1228", name: "Tatysaheb Kore Institute of Engineering and Technology - Warana" },
  { id: "inst_1229", name: "Technocrats Institute of Technology" },
  { id: "inst_1230", name: "Technological Institute Of Textile and Sciences" },
  { id: "inst_1231", name: "Techno India College of Technology" },
  { id: "inst_1232", name: "Teerthanker Mahaveer Institute of Management and Technology" },
  { id: "inst_1233", name: "Tezpur University" },
  { id: "inst_1234", name: "Thadomal Shahani Engineering College" },
  { id: "inst_1235", name: "Thakral College of Technology" },
  { id: "inst_1236", name: "Thakur College Of Engeneering And Technology" },
  { id: "inst_1237", name: "Thangal Kunju Musaliar College of Engineering - TKM" },
  { id: "inst_1238", name: "Thangavelu College" },
  { id: "inst_1239", name: "Thapar Institute of Engineering and Technology" },
  { id: "inst_1240", name: "The American College" },
  { id: "inst_1241", name: "The Heritage Academy" },
  { id: "inst_1242", name: "The Maharaja Sayajirao University of Baroda" },
  { id: "inst_1243", name: "Theegala Krishna Reddy College of Engineering and Technology" },
  { id: "inst_1244", name: "Thiagarajar College of Engineering" },
  { id: "inst_1245", name: "Thiagarajar School of Management" },
  { id: "inst_1246", name: "Tilak Maharashtra Vidyapeeth" },
  { id: "inst_1247", name: "Tilka Manjhi Bhagalpur University" },
  { id: "inst_1248", name: "Toc-H Institute of Science and Technology" },
  { id: "inst_1249", name: "Tripura University" },
  { id: "inst_1250", name: "U. V. Patel College of Engineering" },
  { id: "inst_1251", name: "Ujjain Engineering College" },
  { id: "inst_1252", name: "Union Christian College" },
  { id: "inst_1253", name: "United College of Engineering & Research" },
  { id: "inst_1254", name: "United College of Engineering and Research" },
  { id: "inst_1255", name: "United Institute of Technology - UIT" },
  { id: "inst_1256", name: "University College of Engineering" },
  { id: "inst_1257", name: "University Institute of Computer Science and Applications" },
  { id: "inst_1258", name: "University Institute of Engineering and Technology - UIET" },
  { id: "inst_1259", name: "University Institute of Technology Barkatullah University" },
  { id: "inst_1260", name: "UIT RGP zonal" },
  { id: "inst_1261", name: "University Visvesvaraya College of Engineering" },
  { id: "inst_1262", name: "University of Agricultural Sciences" },
  { id: "inst_1263", name: "University of Burdwan" },
  { id: "inst_1264", name: "University of Calcutta" },
  { id: "inst_1265", name: "University of Calicut" },
  { id: "inst_1266", name: "University of Delhi - University of Delhi" },
  { id: "inst_1267", name: "University of Hyderabad" },
  { id: "inst_1268", name: "University of Jammu" },
  { id: "inst_1269", name: "University of Kalyani" },
  { id: "inst_1270", name: "University of Kashmir" },
  { id: "inst_1271", name: "University of Kerela" },
  { id: "inst_1272", name: "University of Lucknow" },
  { id: "inst_1273", name: "University of Madras" },
  { id: "inst_1274", name: "University of Mumbai" },
  { id: "inst_1275", name: "University of Mysore" },
  { id: "inst_1276", name: "University of North Bengal" },
  { id: "inst_1277", name: "University of Petroleum and Energy Studies - UPES" },
  { id: "inst_1278", name: "University of Pune" },
  { id: "inst_1279", name: "University of Rajasthan" },
  { id: "inst_1280", name: "University of Roorkee - UP" },
  { id: "inst_1281", name: "University of Vishweshwariya College of Engineering" },
  { id: "inst_1282", name: "Utkal Sanskruti Viswavidyalaya" },
  { id: "inst_1283", name: "Utkal University" },
  { id: "inst_1284", name: "Uttam Devi Mohan Lal College of Engineering" },
  { id: "inst_1285", name: "Uttar Banga Krishni Viswavidyalaya" },
  { id: "inst_1286", name: "Uttar Maharashtra Vidyapeeth" },
  { id: "inst_1287", name: "Uttar Pradesh Rajarshi Tandon Open University" },
  { id: "inst_1288", name: "Uttar Pradesh Technical University" },
  { id: "inst_1289", name: "Uttaranchal Institute of Management" },
  { id: "inst_1290", name: "V. H. N. Senthikumaranadar College" },
  { id: "inst_1291", name: "V. L. B. Janakiammal College" },
  { id: "inst_1292", name: "V. S. Patel College" },
  { id: "inst_1293", name: "V.B.S Purvanchal University" },
  { id: "inst_1294", name: "V.S.M. College" },
  { id: "inst_1295", name: "VEL TECH MULTI TECH Engineering College" },
  { id: "inst_1296", name: "VHNSN College" },
  { id: "inst_1297", name: "VIF College of Engineering and Technology" },
  { id: "inst_1298", name: "VR Siddhartha Engineering College" },
  { id: "inst_1299", name: "VRS College of Engineering and Technology - VRSCET" },
  { id: "inst_1300", name: "VVV College for Women" },
  { id: "inst_1301", name: "Vaagdevi Institute of Technology and Science" },
  { id: "inst_1302", name: "Valliammai Engineering College" },
  { id: "inst_1303", name: "VNRVJIET" },
  { id: "inst_1304", name: "Vardhaman College Of Engineering" },
  { id: "inst_1305", name: "Vasavi College of Engineering" },
  { id: "inst_1306", name: "Veer Kunwar Singh University" },
  { id: "inst_1307", name: "Veer Narmad South Gujarat University" },
  { id: "inst_1308", name: "Veer Surendra Sai University Of Technology" },
  { id: "inst_1309", name: "Veermata Jijabai Technological Institute" },
  { id: "inst_1310", name: "Vel Tech High Tech Dr.Rangarajan Dr.Sakunthala Engineering College" },
  { id: "inst_1311", name: "Velammal College of Management and Computer Studies" },
  { id: "inst_1312", name: "Velammal Engineering College - VEC" },
  { id: "inst_1313", name: "Vellalar College of Engineering and Technology" },
  { id: "inst_1314", name: "Vellore Engineering College" },
  { id: "inst_1315", name: "Vellore Institute of Technology" },
  { id: "inst_1316", name: "Vemana Institute of Technology" },
  { id: "inst_1317", name: "Vickram College of Engineering" },
  { id: "inst_1318", name: "Vidya Academy of Science and Technology" },
  { id: "inst_1319", name: "Vidya Bhawan Rural Institute" },
  { id: "inst_1320", name: "Vidya Jyothi Institute of technology - VJIT" },
  { id: "inst_1321", name: "Vidya Pratishthan College Of Engineering" },
  { id: "inst_1322", name: "Vidyalankar Institute Of Technology" },
  { id: "inst_1323", name: "Vidyalankar Polytechnic" },
  { id: "inst_1324", name: "Vidyasagar Viswavidyalaya" },
  { id: "inst_1325", name: "Vignan Institute of Technology and Science" },
  { id: "inst_1326", name: "Vignans Engineering College" },
  { id: "inst_1327", name: "Vignana Jyothi College Of Engineering And Technology" },
  { id: "inst_1328", name: "Vijetha Degree College" },
  { id: "inst_1329", name: "Vikasa Engineering Institute of Technology" },
  { id: "inst_1330", name: "Vikram University" },
  { id: "inst_1331", name: "Villa Marie P. G. College For Women" },
  { id: "inst_1332", name: "Vimal Jyothi Engineering College" },
  { id: "inst_1333", name: "Vinayaka Missions Research Foundation - University" },
  { id: "inst_1334", name: "Vinoba Bhave University" },
  { id: "inst_1335", name: "Vishwakarma Institute of Technology" },
  { id: "inst_1336", name: "Visva-Bharati" },
  { id: "inst_1337", name: "Visvesvaraya National Institute of Technology" },
  { id: "inst_1338", name: "Visvesvaraya Technological University" },
  { id: "inst_1339", name: "Visveswaraiah Technological University" },
  { id: "inst_1340", name: "Viswajyothi College of Engineering and Technology" },
  { id: "inst_1341", name: "Vivekanand Education Society Institute of Technology" },
  { id: "inst_1342", name: "Vivekanand Institute of Technology" },
  { id: "inst_1343", name: "Vivekananda College of Computer Science" },
  { id: "inst_1344", name: "Vivekanandha Institute of Engineering and Technology for Women" },
  { id: "inst_1345", name: "Vivekanandha College of Technology for Women" },
  { id: "inst_1346", name: "Vivekananda Institute of Technology and Science" },
  { id: "inst_1347", name: "Vivekananda Institute of Technology" },
  { id: "inst_1348", name: "Vivekananda School of Post Graduate Studies" },
  { id: "inst_1349", name: "Walchand College of Engineering" },
  { id: "inst_1350", name: "West Bengal National University of Juridical Sciences" },
  { id: "inst_1351", name: "West Bengal University of Animal and Fishery Sciences" },
  { id: "inst_1352", name: "West Bengal University of Technology" },
  { id: "inst_1353", name: "Womens College" },
  { id: "inst_1354", name: "XLRI Jamshedpur Business School" },
  { id: "inst_1355", name: "Xavier Institute of Management" },
  { id: "inst_1356", name: "Xavier Institute of Social Service" },
  { id: "inst_1357", name: "Yagyavalkya Institute of Technology - YIT" },
  { id: "inst_1358", name: "Yashwantrao Chavan Maharashtra Open University" },
  { id: "inst_1359", name: "Yeahwantro Chavan College Of Engineering (YCCE)" },
  { id: "inst_1360", name: "Zakir Hussain College of Engg & Technology" },
  { id: "inst_1361", name: "Velalar College of Engineering and Technology" },
  { id: "inst_1362", name: "Sri Eshwar College Of Engineering" },
  { id: "inst_1363", name: "PSG Institute Of Technology and Applied Research" },
  { id: "inst_1364", name: "Mahendra Institute of Technology" },
  { id: "inst_1365", name: "knowledge institute of technology" },
  { id: "inst_1366", name: "seagi" },
  { id: "inst_1367", name: "sree vidyanikethan engineering college" },
  { id: "inst_1368", name: "Gayatri Vidya Parishad College of engineering for women" },
  { id: "inst_1369", name: "KIT - Kalaignar Karunanidhi Institute of Technology" },
  { id: "inst_1370", name: "Info Institute of Engineering" },
  { id: "inst_1371", name: "KPR Institute of Engineering and Technology" },
  { id: "inst_1372", name: "Sri Sairam Institute of technology" },
  { id: "inst_1373", name: "Dr.NGP Institute of technology" },
  { id: "inst_1374", name: "PSGR Krishnammal College for Women" },
  { id: "inst_1375", name: "Central Institute of Plastic Engineering and Technology" },
  { id: "inst_1376", name: "Akshaya College of Engineering and Technology" },
  { id: "inst_1377", name: "Sree Sakthi Engineering College" },
  { id: "inst_1378", name: "Muthoot Institute of Technology and Science" },
  { id: "inst_1380", name: "Ramco Institute of Technology" },
  { id: "inst_1381", name: "Dhirajlal Gandhi College of Technology" },
  { id: "inst_1382", name: "Velammal College Of Engineering and Technology" },
  { id: "inst_1383", name: "TRP Engineering College" },
  { id: "inst_1384", name: "Nandha College of Technology" },
  { id: "inst_1385", name: "MIET Engineering College" },
  { id: "inst_1386", name: "Christ college of engineering and technology" },
  { id: "inst_1387", name: "K. Ramakrishnan College of Technology" },
  { id: "inst_1388", name: "Sri Ramakrishna Institute of Technology" },
  { id: "inst_1389", name: "Sree Chitra Thirunal College of Engineering" },
  { id: "inst_1390", name: "Galaxy Institute of Technology" },
  { id: "inst_1391", name: "JCT College of Engineering and Technology" },
  { id: "inst_1392", name: "Sri Krishna College of Technology (SKCT)" },
  { id: "inst_1393", name: "Daiata Madhusudhana Sastry sri venkateswara hindu Colllege of Engineering" },
  { id: "inst_1394", name: "CMF College" },
  { id: "inst_1395", name: "CMS College" },
  { id: "inst_1396", name: "Kongunadu Institute of Engineering and Technology" },
  { id: "inst_1397", name: "bharathi matriculation higher secondary school" },
  { id: "inst_1398", name: "Mahatma Gandhi Medical College & Research Institute" },
  { id: "inst_1399", name: "SSS Film Academy" },
  { id: "inst_1400", name: "Rathinam College of Arts" },
  { id: "inst_1401", name: "SSN Institute of Engineering & Technology" },
  { id: "inst_1402", name: "sri guru institute of technlogy" },
  { id: "inst_1403", name: "Suguna PIP School" },
  { id: "inst_1404", name: "Nehru College of Aeronautics & Applied science" },
  { id: "inst_1405", name: "SVS College of Engineering" },
  { id: "inst_1406", name: "KAP Viswanatham Government Medical College" },
  { id: "inst_1407", name: "SSM Institute of Engineering and technology" },
  { id: "inst_1408", name: "NGM Arts & Science College" },
  { id: "inst_1409", name: "SNS College of Technology" },
  { id: "inst_1410", name: "RVS College of engineering and technology" },
  { id: "inst_1411", name: "Nehru Institute OF Engineering & Technology" }
]
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)
  if (hasError) {
    return <div className="text-red-600 text-center">Error rendering form. Check console for details.</div>
  }
  try {
    return children
  } catch (error) {
    console.error("Error in RegisterPage:", error)
    setHasError(true)
    return null
  }
}

export default function RegisterPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [role, setRole] = useState("STUDENT")
  const [step, setStep] = useState(1)
  const [mobileError, setMobileError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [adminUserId, setAdminUserId] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [adminError, setAdminError] = useState("")
  const [isTncDialogOpen, setIsTncDialogOpen] = useState(true)
  const [verificationStatus, setVerificationStatus] = useState("idle") // idle, sent, verified, error
  const [verificationError, setVerificationError] = useState("") // Added to store verification error message
  const [isInstituteDropdownOpen, setIsInstituteDropdownOpen] = useState(false)
  const [filteredInstitutes, setFilteredInstitutes] = useState(institutes)
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const [formData, setFormData] = useState({
    institute: "",
    name: "",
    instituteId: "",
    mobile: "",
    email: "",
    gender: "",
    dob: "",
    stream: "",
    branch: "",
    currentYear: "",
    passoutYear: "",
    idCardFront: "",
    idCardBack: "",
    driveLink: "",
  })

  const validateMobile = (mobile: string) => {
    const regex = /^\d{10}$/
    if (!regex.test(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number")
      return false
    }
    setMobileError("")
    return true
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const handleSendVerificationLink = async () => {
    if (!validateEmail(formData.email)) {
      console.error("RegisterPage - Invalid email for verification")
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      })
      return
    }
    try {
      const response = await fetch(`/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, name: formData.name }),
      })
      const data = await response.json()
      if (response.ok || data.success) {
        setVerificationStatus("sent")
        setVerificationError("")
        toast({
          title: "Sent!",
          description: "Verification Email Sent.",
        })
      } else {
        setVerificationStatus("error")
        setVerificationError(data.message || "Failed to send verification link")
        toast({
          variant: "destructive",
          title: "Failed!",
          description: data.message || "Failed to send verification link",
        })
        console.error("RegisterPage - Verification error:", data.message || "Failed to send verification link")
      }
    } catch (error) {
      console.error("RegisterPage - Error sending verification link:", error)
      setVerificationStatus("error")
      setVerificationError("Error sending verification link")
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Error sending verification link",
      })
    }
  }

  const handleCheckVerification = async () => {
    try {
      const response = await fetch(`/api/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })
      const data = await response.json()
      if (data.success) {
        setVerificationError("")
        toast({
          title: "Verified!",
          description: "You're verified now.",
        })
      } else {
        setVerificationStatus("error")
        setVerificationError(data.message || "Email not verified yet")
        toast({
          variant: "destructive",
          title: "Not Verified",
          description: data.message || "Email not verified yet",
        })
      }
    } catch (error) {
      console.error("RegisterPage - Error checking verification:", error)
      setVerificationStatus("error")
      setVerificationError("Error checking verification")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error checking verification",
      })
    }
  }


  const handleNextStep = () => {
    if (verificationStatus !== "verified") {
      console.error("RegisterPage - Email not verified")
      toast({
        variant: "destructive",
        title: "Email Not Verified",
        description: "Please verify your email before proceeding.",
      })
      return
    }
    if (!validateMobile(formData.mobile) || !validateEmail(formData.email)) {
      console.error("RegisterPage - Invalid mobile or email")
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid mobile number and email address.",
      })
      return
    }
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { id: keyof typeof formData; value: string };
  }

  const handleInputChange = (e: InputChangeEvent) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    if (id === "institute") {
      const filtered = institutes.filter((inst) =>
        inst.name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredInstitutes(filtered)
      setIsInstituteDropdownOpen(value.length >= 3 && filtered.length > 0)
    }
    if (id === "mobile") {
      validateMobile(value)
    }
    if (id === "email") {
      validateEmail(value)
      setVerificationStatus("idle")
    }
  }

  const handleInstituteSelect = (institute: string) => {
    setFormData((prev) => ({ ...prev, institute }))
    setIsInstituteDropdownOpen(false)
  }

  interface HandleSelectChange {
    (key: keyof typeof formData): (value: string) => void;
  }

  const handleSelectChange: HandleSelectChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleAdminUserIdChange = (e: InputChangeEvent) => {
    setAdminUserId(e.target.value)
    setAdminError("")
  }

  const handleAdminPasswordChange = (e: InputChangeEvent) => {
    setAdminPassword(e.target.value)
    setAdminError("")
  }

  const handleAdminLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: adminUserId, password: adminPassword }),
      })
      const data = await response.json()
      if (!data.success) {
        setAdminError(data.message || "Admin login failed")
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: data.message || "Admin login failed",
        })
        return
      }
      localStorage.setItem("token", data.token)
      setAdminError("")
      router.push("/admin/dashboard")
    } catch (err) {
      console.error("RegisterPage - Error admin login:", err)
      setAdminError("Error signing in as admin")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error signing in as admin",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateMobile(formData.mobile) || !validateEmail(formData.email)) {
      console.error("RegisterPage - Invalid mobile number or email")
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid mobile number and email address.",
      })
      return
    }
    if (!formData.institute || !formData.name || !formData.instituteId || !formData.email || !formData.idCardFront || !formData.idCardBack) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in all required fields.",
      })
      return
    }
    if (role === "STUDENT" && (!formData.stream || !formData.branch || !formData.currentYear || !formData.passoutYear)) {
      console.error("RegisterPage - Missing student-specific fields")
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in all student-specific fields.",
      })
      return
    }
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      })
      const data = await response.json()
      if (data.success) {
        toast({
          title: "Success!",
          description: "Registration successful. Redirecting to login.",
        })
        router.push("/auth/login")
      } else {
        console.error("RegisterPage - Registration failed:", data.message)
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: data.message || "Failed to register.",
        })
      }
    } catch (error) {
      console.error("RegisterPage - Error submitting form:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error submitting form.",
      })
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-[1200px]">
      <style jsx>{`
        input {
          display: block !important;
          outline: 1px solid blue !important;
          visibility: visible !important;
        }
      `}</style>
      <Link href="/" className="inline-flex items-center mb-8 text-sm font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="mx-auto max-w-5xl">
        <ErrorBoundary>
          <Tabs defaultValue="student" className="w-full">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
              <p className="text-muted-foreground">Join thousands of students enjoying exclusive discounts</p>
            </div>

            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="student">Student / Faculty</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <Card className="mx-auto max-w-2xl">
                <CardHeader>
                  <CardTitle>Register as Student or Faculty</CardTitle>
                  <CardDescription>Create an account to access exclusive student discounts</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    {step === 1 && (
                      <div className="space-y-4">
                        <div className="space-y-2 relative">
                          <Label htmlFor="institute">Institute Name</Label>
                          <Input
                            id="institute"
                            placeholder="Enter your institute name"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.institute}
                            onChange={handleInputChange}
                            onFocus={() => {
                              if (formData.institute.length >= 3) {
                                const filtered = institutes.filter((inst) =>
                                  inst.name.toLowerCase().includes(formData.institute.toLowerCase())
                                )
                                setFilteredInstitutes(filtered)
                                setIsInstituteDropdownOpen(filtered.length > 0)
                              }
                            }}
                            onBlur={() => {
                              setTimeout(() => setIsInstituteDropdownOpen(false), 200)
                            }}
                          />
                          {isInstituteDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                              {filteredInstitutes.length > 0 ? (
                                filteredInstitutes.map((inst) => (
                                  <div
                                    key={inst.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    onMouseDown={() => handleInstituteSelect(inst.name)}
                                  >
                                    {inst.name}
                                  </div>
                                ))
                              ) : (
                                <div className="px-4 py-2 text-sm text-gray-500">
                                  No matching institutes
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Role</Label>
                          <RadioGroup defaultValue="STUDENT" onValueChange={setRole}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="STUDENT" id="student" />
                              <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="FACULTY" id="faculty" />
                              <Label htmlFor="faculty">Faculty / Staff</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name (as per college ID)</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instituteId">{role === "STUDENT" ? "Institute Roll Number" : "Employee ID"}</Label>
                          <Input
                            id="instituteId"
                            placeholder={role === "STUDENT" ? "Enter your roll number" : "Enter your employee ID"}
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.instituteId}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <div className="flex-1">
                            <Input
                              id="mobile"
                              placeholder="Enter your 10-digit mobile number"
                              className="block focus:ring-2 focus:ring-blue-500"
                              value={formData.mobile}
                              onChange={handleInputChange}
                            />
                            {mobileError && (
                              <p className="text-red-600 text-sm mt-1">{mobileError}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="flex-1">
                            <Input
                              id="email"
                              placeholder="Enter your email address"
                              className="block focus:ring-2 focus:ring-blue-500"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {emailError && (
                              <p className="text-red-600 text-sm mt-1">{emailError}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2" data-verification-status={verificationStatus}>
                          <Label>Email Verification</Label>
                          {verificationStatus === "idle" && (
                            <Button
                              onClick={handleSendVerificationLink}
                              disabled={!formData.email || !!emailError}
                            >
                              Send Verification Link
                            </Button>
                          )}
                          {verificationStatus === "sent" && (
                            <Button
                              onClick={handleCheckVerification}
                            >
                              Refresh
                            </Button>
                          )}
                          {verificationStatus === "verified" && (
                            <div className="flex items-center">
                              <CheckCircle className="w-5 h-5 mr-1 text-green-600" />
                              <p className="text-green-600 text-sm">Verified Successfully</p>
                            </div>
                          )}
                          {verificationStatus === "error" && (
                            <div className="space-y-2">
                              <p className="text-red-600 text-sm">{verificationError || "Email not verified yet"}</p>
                              <Button
                                onClick={handleCheckVerification}
                              >
                                Refresh
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select onValueChange={handleSelectChange("gender")}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            id="dob"
                            type="date"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.dob}
                            onChange={handleInputChange}
                          />
                        </div>

                        {role === "STUDENT" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="stream">Stream</Label>
                              <Select onValueChange={handleSelectChange("stream")}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select stream" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="engineering">Engineering</SelectItem>
                                  <SelectItem value="science">Science</SelectItem>
                                  <SelectItem value="arts">Arts</SelectItem>
                                  <SelectItem value="commerce">Commerce</SelectItem>
                                  <SelectItem value="medicine">Medicine</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="branch">Branch</Label>
                              <Input
                                id="branch"
                                placeholder="Enter your branch"
                                className="block focus:ring-2 focus:ring-blue-500"
                                value={formData.branch}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="currentYear">Current Year of Study</Label>
                              <Select onValueChange={handleSelectChange("currentYear")}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1st Year</SelectItem>
                                  <SelectItem value="2">2nd Year</SelectItem>
                                  <SelectItem value="3">3rd Year</SelectItem>
                                  <SelectItem value="4">4th Year</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="passoutYear">Passout Year</Label>
                              <Select onValueChange={handleSelectChange("passoutYear")}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select passout year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 10 }, (_, i) => {
                                    const year = new Date().getFullYear() + i
                                    return (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="idCardFront">ID Card Front (Google Drive Link)</Label>
                          <Input
                            id="idCardFront"
                            placeholder="Enter Google Drive link for ID card front"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.idCardFront}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="idCardBack">ID Card Back (Google Drive Link)</Label>
                          <Input
                            id="idCardBack"
                            placeholder="Enter Google Drive link for ID card back"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.idCardBack}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="driveLink">Additional Google Drive Link (Optional)</Label>
                          <Input
                            id="driveLink"
                            placeholder="Enter additional Google Drive link"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.driveLink}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between mt-4">
                    {step === 1 ? (
                      <div className="flex w-full justify-between">
                        <Button asChild>
                          <Link href="/auth/login">Already have an account? Sign In</Link>
                        </Button>
                        <Button
                          onClick={handleNextStep}
                          disabled={verificationStatus !== "verified" || !formData.institute || !formData.email || !!mobileError || !!emailError}
                        >
                          Next
                        </Button>
                      </div>
                    ) : (
                      <div className="flex w-full justify-between">
                        <Button variant="outline" onClick={handlePrevStep}>
                          Previous
                        </Button>
                        <Button
                          type="submit"
                          disabled={
                            !formData.institute ||
                            !formData.email ||
                            !formData.idCardFront ||
                            !formData.idCardBack ||
                            !!mobileError ||
                            !!emailError
                          }
                        >
                          Register
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card className="mx-auto max-w-md">
                <CardHeader>
                  <CardTitle>Admin Login</CardTitle>
                  <CardDescription>
                    Admins can only login. Please contact support if you need admin access.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-userid">User ID</Label>
                      <Input
                        id="admin-userid"
                        placeholder="Enter admin user ID"
                        className="block focus:ring-2 focus:ring-blue-500"
                        value={adminUserId}
                        onChange={handleAdminUserIdChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Enter password"
                        className="block focus:ring-2 focus:ring-blue-500"
                        value={adminPassword}
                        onChange={handleAdminPasswordChange}
                      />
                    </div>
                    {adminError && <p className="text-sm text-red-600">{adminError}</p>}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={!adminUserId || !adminPassword}
                    onClick={handleAdminLogin}
                  >
                    Login as Admin
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
      </div>

      <Dialog open={isTncDialogOpen} onOpenChange={setIsTncDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader className="relative">
            <DialogTitle className="text-lg">Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Above 12 Years of Age</li>
              <li>From a School, College or University Recognised by Central or State Governments of India</li>
              <li>T&C are subject to change with the brand choice</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="telegram"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://t.me/classyfyed', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="instagram"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://www.instagram.com/classyfyed.in/', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="facebook"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://www.facebook.com/classyfyed.in/', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="whatsapp"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://whatsapp.com/channel/0029Vb7xJATJpe8jQSk5dQ1f', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="twitter"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://x.com/_Classyfyed', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="youtube"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://www.youtube.com/channel/UC5X542lwTzQPN1qMbcdnXMg', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="reddit"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://www.reddit.com/user/classyfyed/', '_blank', 'noopener,noreferrer')}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}